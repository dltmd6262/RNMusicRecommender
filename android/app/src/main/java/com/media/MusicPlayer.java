package com.media;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;

public class MusicPlayer extends ReactContextBaseJavaModule {

    private ReactApplicationContext rctContext;
    private MediaPlayer currentMusic = null;
    private Handler mProgressHandle = new Handler(Looper.getMainLooper());

    private final BroadcastReceiver changeReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent.getAction().equals(AudioManager.ACTION_AUDIO_BECOMING_NOISY)) {
                MusicPlayer.this.pauseCurrentMusic();
            }
        }
    };

    public MusicPlayer (ReactApplicationContext reactContext) {
        super(reactContext);

        rctContext = reactContext;
        IntentFilter filter = new IntentFilter();
        filter.addAction(AudioManager.ACTION_AUDIO_BECOMING_NOISY);
        reactContext.registerReceiver(this.changeReceiver, filter);
    }

    @Override public String getName() {
        return "MusicPlayer";
    }

    @ReactMethod
    public void playNewMusic(String path, Promise promise) {
        Uri filePath = Uri.fromFile(new File(path));
        Log.w("com.media", filePath.toString());
        try {
            mProgressHandle.removeCallbacks(updateMusicProgress);

            if (this.currentMusic != null) {
                this.currentMusic.release();
            }

            this.currentMusic = MediaPlayer.create(this.getReactApplicationContext(), filePath);
            this.currentMusic.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mp.start();
                    mProgressHandle.postDelayed(updateMusicProgress, 100);
                }
            });

            this.currentMusic.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    WritableMap result = Arguments.createMap();
                    rctContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("MusicCompleted", result);
                }
            });

            WritableMap result = Arguments.createMap();
            result.putInt("duration", this.currentMusic.getDuration());

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
            Log.e("com.media", e.toString());
        }
    }

    @ReactMethod
    public void playCurrentMusic() {
        if (this.currentMusic == null || this.currentMusic.isPlaying()) {
            Log.i("com.media", "No current music is set or is already playing.");
            return;
        }

        this.currentMusic.start();
    }

    @ReactMethod
    public void pauseCurrentMusic() {
        if (this.currentMusic == null || !this.currentMusic.isPlaying()) {
            Log.i("com.media", "No current music is set or is not playing.");
            return;
        }

        this.currentMusic.pause();
    }

    private Runnable updateMusicProgress = new Runnable() {
        public void run() {
            if (currentMusic != null && currentMusic.isPlaying()) {
                WritableMap result = Arguments.createMap();
                result.putInt("currentPosition", currentMusic.getCurrentPosition());
                rctContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("MusicProgress", result);
            }

            mProgressHandle.postDelayed(this, 100);
        }
    };

    @ReactMethod
    public void jumpTo(Integer time) {
        if (this.currentMusic == null) {
            Log.i("com.media", "No music is playing to jump to");
            return;
        }

        this.currentMusic.seekTo(time);

        if (!this.currentMusic.isPlaying()) {
            this.currentMusic.start();
        }
    }
}
