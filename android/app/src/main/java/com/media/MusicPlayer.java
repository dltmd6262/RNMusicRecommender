package com.media;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class MusicPlayer extends ReactContextBaseJavaModule {

    private final BroadcastReceiver changeReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            Log.w("com.media", "1234");
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
    public void playNewMusic(String path) {
        Uri filePath = Uri.fromFile(new File(path));
        Log.w("com.media", filePath.toString());
        try {
            if (this.currentMusic != null) {
                this.currentMusic.release();
            }

            this.currentMusic = MediaPlayer.create(this.getReactApplicationContext(), filePath);
            this.currentMusic.start();
        } catch (Exception e) {
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

    @ReactMethod
    public void loopCurrentMusic(Boolean loop) {
        if (this.currentMusic == null) {
            Log.i("com.media", "No music is playing to loop");
            return;
        }

        this.currentMusic.setLooping(loop);
    }
}
