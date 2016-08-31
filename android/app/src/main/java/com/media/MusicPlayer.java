package com.media;

import android.media.MediaPlayer;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class MusicPlayer extends ReactContextBaseJavaModule {

    public MusicPlayer (ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override public String getName() {
        return "MusicPlayer";
    }

    private MediaPlayer currentMusic = null;


    @ReactMethod
    void playNewMusic(String path) {
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
    void playCurrentMusic() {
        if (this.currentMusic == null || this.currentMusic.isPlaying()) {
            Log.i("com.media", "No current music is set or is already playing.");
            return;
        }

        this.currentMusic.start();
    }

    void pauseCurrentMusic() {
        if (this.currentMusic == null || !this.currentMusic.isPlaying()) {
            Log.i("com.media", "No current music is set or is not playing.");
            return;
        }

        this.currentMusic.pause();
    }
}
