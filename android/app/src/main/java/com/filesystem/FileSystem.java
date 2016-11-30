package com.filesystem;

import android.database.Cursor;
import android.provider.MediaStore;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.real_pitch.MainActivity;

public class FileSystem extends ReactContextBaseJavaModule {

    WritableArray allFiles = Arguments.createArray();

    public FileSystem (ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FileSystem";
    }

    void walkFileTree() {
        String selection = MediaStore.Audio.Media.IS_MUSIC + " != 0";

        String[] projection = {
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.DATA,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media.ALBUM_ID,
        };

        Cursor cursor = this.getReactApplicationContext().getContentResolver().query(
                MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                projection,
                selection,
                null,
                null);

        while(cursor != null & cursor.moveToNext()) {
            WritableMap fileDB = Arguments.createMap();

            fileDB.putString("artist", cursor.getString(0));
            fileDB.putString("title", cursor.getString(1));
            fileDB.putString("path", cursor.getString(2));
            fileDB.putString("fileName", cursor.getString(1));
            fileDB.putString("duration", cursor.getString(3));

            Cursor albumCur = this.getReactApplicationContext().getContentResolver().query(MediaStore.Audio.Albums.EXTERNAL_CONTENT_URI,
                    new String[] {MediaStore.Audio.Albums.ALBUM_ART},
                    MediaStore.Audio.Albums._ID + '=' + cursor.getString(4),
                    null, null
            );

            if (albumCur != null && albumCur.moveToFirst()) {
                String albumPath = albumCur.getString(albumCur.getColumnIndex(MediaStore.Audio.Albums.ALBUM_ART));
                fileDB.putString("album", albumPath);
                albumCur.close();
            }

            this.allFiles.pushMap(fileDB);
        }
    }

    @ReactMethod
    public void getFoldersWithMusic(Promise promise) {
        walkFileTree();
        promise.resolve(this.allFiles);
    }

    @ReactMethod
    public void stopSplashScreen() {
        MainActivity main = (MainActivity) getCurrentActivity();
        if (main != null) {
            main.stopSplashScreen();
        }
    }
}