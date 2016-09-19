package com.media;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;

public class MusicPlayer extends ReactContextBaseJavaModule {

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

        IntentFilter filter = new IntentFilter();
        filter.addAction(AudioManager.ACTION_AUDIO_BECOMING_NOISY);
        reactContext.registerReceiver(this.changeReceiver, filter);
    }

    @Override public String getName() {
        return "MusicPlayer";
    }

    private MediaPlayer currentMusic = null;

    @ReactMethod
    public void playNewMusic(String path, Promise promise) {
        Uri filePath = Uri.fromFile(new File(path));
        Log.w("com.media", filePath.toString());
        try {
            if (this.currentMusic != null) {
                this.currentMusic.release();
            }

            this.currentMusic = MediaPlayer.create(this.getReactApplicationContext(), filePath);
            this.currentMusic.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    mp.start();
                    mp.setLooping(true);
                }
            });

            WritableMap result = Arguments.createMap();
            result.putString("duration", Integer.toString(this.currentMusic.getDuration()));

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
    public void playFromBeginning() {
        if (this.currentMusic == null) {
            Log.i("com.media", "No current music is set to start from beginning");
            return;
        }
        
        this.currentMusic.seekTo(0);
    }

    @ReactMethod
    public void pauseCurrentMusic() {
        if (this.currentMusic == null || !this.currentMusic.isPlaying()) {
            Log.i("com.media", "No current music is set or is not playing.");
            return;
        }

        this.currentMusic.pause();
    }

    @ReactMethod
    public void loopCurrentMusic(Boolean loop) {
        if (this.currentMusic == null) {
            Log.i("com.media", "No music is playing to loop");
            return;
        }

        this.currentMusic.setLooping(loop);
    }

    @ReactMethod
    public void getMusicProgress(Promise promise) {
        if (this.currentMusic == null) {
            Log.i("com.media", "No music is playing to get progress from");
            return;
        }

        WritableMap result = Arguments.createMap();
        result.putString("currentPosition", Integer.toString(this.currentMusic.getCurrentPosition()));
        promise.resolve(result);
    }

    @ReactMethod
    public void jumpTo(Integer time) {
        if (this.currentMusic == null) {
            Log.i("com.media", "No music is playing to jump to");
            return;
        }

        this.currentMusic.seekTo(time);
    }
}
