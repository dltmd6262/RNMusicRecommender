package com.real_pitch;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.animation.LinearInterpolator;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    private View splash = null;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Real_Pitch";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        splash = getLayoutInflater().inflate(R.layout.splash_screen, null);
        addContentView(splash, new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        ((ViewGroup) splash.getParent()).setClipChildren(false);

        Animation translation = AnimationUtils.loadAnimation(this, R.anim.translate);
        translation.setInterpolator(new LinearInterpolator());
        splash.findViewById(R.id.splash_screen).startAnimation(translation);
    }

    public void stopSplashScreen() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (splash != null) {
                    splash.clearAnimation();
                    ((ViewGroup) splash.getParent()).removeView(splash);
                    splash = null;
                }
            }
        });
    }
}
