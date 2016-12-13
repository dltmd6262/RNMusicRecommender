package com.media;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
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

    private AudioManager.OnAudioFocusChangeListener focusChangeListener = new AudioManager.OnAudioFocusChangeListener() {
        @Override
        public void onAudioFocusChange(int focusChange) {
            switch (focusChange) {
                case (AudioManager.AUDIOFOCUS_LOSS):
                    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("AudioFocusLoss", Arguments.createMap());
                    break;
                case (AudioManager.AUDIOFOCUS_LOSS_TRANSIENT):
                    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("AudioFocusLossTransient", Arguments.createMap());
                    break;
                case (AudioManager.AUDIOFOCUS_GAIN):
                    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("AudioFocusGain", Arguments.createMap());
                    break;
                case (AudioManager.AUDIOFOCUS_GAIN_TRANSIENT):
                    getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("AudioFocusGainTransient", Arguments.createMap());
                    break;
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

        try {
            AudioManager am = (AudioManager) getReactApplicationContext().getSystemService(getReactApplicationContext().AUDIO_SERVICE);
            int permissionResult = am.requestAudioFocus(focusChangeListener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN);

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
                    rctContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("MusicCompleted", Arguments.createMap());
                }
            });

            promise.resolve(Arguments.createMap());
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

        AudioManager am = (AudioManager) getReactApplicationContext().getSystemService(getReactApplicationContext().AUDIO_SERVICE);
        int permissionResult = am.requestAudioFocus(focusChangeListener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN);
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

    @ReactMethod
    public void changeMute(Boolean mute) {
        if (this.currentMusic == null) {
            Log.i("com.media", "No music is playing to mute");
        }

        Integer volume = mute ? 0 : 1;
        this.currentMusic.setVolume(volume, volume);
    }
}
