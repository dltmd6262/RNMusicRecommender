package com.filesystem;

import android.media.MediaPlayer;
import android.os.Environment;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.util.ArrayList;

public class FileSystem extends ReactContextBaseJavaModule {

    WritableArray allFiles = Arguments.createArray();

    public FileSystem (ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FileSystem";
    }

    void walkFileTree(File[] paths, String name) {
        ArrayList<File> nextFolderPaths = new ArrayList<File>(0);

        WritableMap folder = Arguments.createMap();
        WritableArray files = Arguments.createArray();

        folder.putString("name", name);

        for (File file : paths) {
            if (file.isDirectory()) {
                walkFileTree(file.listFiles(), file.getName());
            } else {
                String fileName = file.getName();
                if (fileName.endsWith(".mp3")) {
                    WritableMap currentFile = Arguments.createMap();
                    currentFile.putString("fileName", fileName);
                    currentFile.putString("path", file.getAbsolutePath());
                    files.pushMap(currentFile);
                }
            }
        }

        folder.putArray("files", files);

        this.allFiles.pushMap(folder);
    }

    @ReactMethod
    public void getFoldersWithMusic(Promise promise) {
        File root = Environment.getExternalStorageDirectory();
        walkFileTree(new File[]{root}, "root");

        promise.resolve(this.allFiles);
    }
}