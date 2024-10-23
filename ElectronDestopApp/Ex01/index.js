const { app, BrowserWindow } = require('electron') // components for the electron Window
const path = require('node:path')
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      } // Run a script before the window is rendered -> for any data need to fetch and view on the screen
    }) // create a screen
  
    win.loadURL("http://localhost:3000") //load file into the window screen
  }

  app.whenReady().then(() => {
    createWindow()  // Call this function to create your window
    //MacOS exclusive features 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow() 
            // Create a window if there are currently no windows. Start up the app or to create a screen for 
            //Mac exclusive close screen but still open app
      })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })  // Detect if all windows are closed then quit the application

  
