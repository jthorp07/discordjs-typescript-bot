package com.thorpjj.discord.bot.discordbotgui.discordbotgui;

import com.thorpjj.discord.bot.discordbotgui.discordbotgui.util.CrossPlatformUtils;
import com.thorpjj.discord.bot.discordbotgui.discordbotgui.util.SystemCommandResults;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.*;

public class BotGuiApp extends Application {

    private static final int MINIMUM_MAJOR_NODE_VERSION = 20;

    @Override
    public void start(Stage stage) throws IOException {

        preInit(); // Check to see if this thang can run

        FXMLLoader fxmlLoader = new FXMLLoader(BotGuiApp.class.getResource("bot-gui-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 320, 240);
        stage.setTitle("My Discord Bot Manager");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }

    /**
     * Launches a subprocess to execute a node version command to detect the Node.js version installed
     * on the client. If no Node version is detected or the Node version is older than the minimum major
     * version defined by MINIMUM_MAJOR_NODE_VERSION, returns a non-zero result.
     *
     * @return 1 if on the wrong version, 2 if Node is not installed at all, 4 if another error occurred
     * @throws IOException
     * @throws InterruptedException
     */
    private int checkSystemNodeVersion() throws IOException, InterruptedException {

        int result = 0;
        SystemCommandResults cmdResults = CrossPlatformUtils.executeSystemCommand("node -v");

        if (cmdResults.stdIn.length == 0 && cmdResults.stdErr.length == 0) {
            System.err.println("System command 'node -v' yielded no output.");
            result = result | 4;
        } else if (cmdResults.stdIn.length == 1 && cmdResults.stdIn[0].startsWith("v")) {
            if (Integer.parseInt(cmdResults.stdIn[0].substring(1).split("\\.")[0]) < MINIMUM_MAJOR_NODE_VERSION) result = result | 1;
        } else if (cmdResults.stdErr.length == 1 && cmdResults.stdErr[0].toLowerCase().startsWith("node:")) {
            result = result | 2;
        }
        return result;
    }

    private void preInit() {
        try {
            int result = checkSystemNodeVersion();
            if (result != 0) {
                System.exit(result);
            }
        } catch (InterruptedException | IOException e) {
            System.out.println("Unable to check system for application requirements");
            System.exit(-1);
        }
    }
}