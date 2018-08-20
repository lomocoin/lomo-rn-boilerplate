//  How to use it
//  yarn rename arg1 arg2 arg3
//  arg1 platformType (android,ios,all)
//  arg2 ios,android package name
//  arg3 ios,android app name

//  Examples
//  yarn rename all com.lomorn.test lomoTestProject
//  yarn rename ios com.lomorn.test lomoTestProject
//  yarn rename android com.lomorn.test lomoTestProject

const fs = require("fs");
const spath = require("path");
// var os = require("os");

const platformType = process.argv[2];
const appId = process.argv[3];
const appName = process.argv[4];

// input config check start
if (!platformType) {
  console.log("please input platform Type (ios | android | all)");
  return;
}
if (
  platformType !== "ios" &&
  platformType !== "android" &&
  platformType !== "all"
) {
  console.log("input platform type error,such as ios or android or all");
  return;
}
if (!appId) {
  console.log("please input app id,such as 'com.lomocoin.boilerplate'");
  return;
}
if (!appName) {
  console.log("please input app name,such as 'boilerplate'");
  return;
}
// input config check end

//init ios configure
getIosAllFile("./ios", function (f, s) {
  if (platformType !== "ios" && platformType !== "all") {
    return;
  }

  const infoFile = f.match(/\/Info.plist/);
  if (infoFile != null) {
    configureIos(f);
  }
});

//init configure android
getAndroidAllFile("./android", function (f, s) {
  if (platformType !== "android" && platformType !== "all") {
    return;
  }
  //find project build.gradle
  const isProjectGradle = f.match(/.*\/build\.gradle/);
  if (isProjectGradle != null) {
    configureGradle(f);
  }
  //find project BUCK
  const isProjectBUCK = f.match(/.*app\/BUCK/);
  if (isProjectBUCK != null) {
    configureBUCK(f);
  }
  //find project strings.xml
  const isProjectAppName = f.match(/.*app\/src\/main\/res\/values\/strings.xml/);
  if (isProjectAppName != null) {
    configureAndroidAppName(f);
  }
});

// configure android build.gradle
function configureGradle(path) {
  if (isFile(path) == false) {
    console.log("[android] configureGradle error!");
    return;
  }
  let rf = fs.readFileSync(path, "utf-8");
  const isAlreadyWrite = path.match(/.*android\/app.*/);
  if (isAlreadyWrite != null) {
    const searchKey = rf.match(/\n.*applicationId.*\n/);
    if (searchKey != null) {
      rf = rf.replace(
        searchKey[0],
        '\n        applicationId "' + appId + '"\n'
      );
      fs.writeFileSync(path, rf, "utf-8");
      console.log("success [android] configure build.gradle,file path:" + path);
    } else {
      console.log("error [android] configure build.gradle,file path:" + path);
    }
  }
}

// configure android BUCK
function configureBUCK(path) {
  if (isFile(path) == false) {
    console.log("[android] configureBUCK error!!");
    return;
  }

  let rf = fs.readFileSync(path, "utf-8");
  const isAlreadyWrite = path.match(/.*app\/BUCK/);
  if (isAlreadyWrite != null) {
    const rex = new RegExp(/\n.*package =.*\n/, "g"); //not global matching
    const searchKey = rf.match(rex);
    if (searchKey != null) {
      searchKey.map(item => {
        rf = rf.replace(item, '\n    package = "' + appId + '",\n');
        fs.writeFileSync(path, rf, "utf-8");
      });
      console.log("success [android] configure BUCK,file path:" + path);
    } else {
      console.log("error [android] configure BUCK,file path:" + path);
    }
  }
}

// configure android app name
function configureAndroidAppName(path) {
  if (isFile(path) == false) {
    console.log("[android] configureAndroidAppName error!!");
    return;
  }
  let rf = fs.readFileSync(path, "utf-8");
  const isAlreadyWrite = path.match(/.*app\/src\/main\/res\/values\/strings.xml/);
  if (isAlreadyWrite != null) {
    const rex = new RegExp(/.*<string name="app_name">.*<\/string>.*/); //not global matching
    const searchKey = rf.match(rex);
    if (searchKey != null) {
      rf = rf.replace(
        searchKey[0],
        '<string name="app_name">' + appName + "</string>"
      );
      fs.writeFileSync(path, rf, "utf-8");
      console.log("success [android] configure app name,file path:" + path);
    } else {
      console.log("error [android] configure app name,file path:" + path);
    }
  }
}

// configure android app name
function configureIos(path) {
  if (isFile(path) == false) {
    console.log("[ios] configureIos error!!");
    return;
  }
  let rf = fs.readFileSync(path, "utf-8");
  const isAlreadyWrite1 = rf.match(/>CFBundleDisplayName</);
  const isAlreadyWrite2 = rf.match(/>CFBundleIdentifier</);
  if (isAlreadyWrite1 != null && isAlreadyWrite2 != null) {
    const searchValue1 = rf.match(
      /.*<key>CFBundleDisplayName<\/key>\n.*<string>.*<\/string>.*/
    );
    if (searchValue1 != null) {
      rf = rf.replace(
        searchValue1[0],
        "    <key>CFBundleDisplayName</key>\n    <string>" + appName + "</string>"
      );
    }

    var searchValue2 = rf.match(
      /.*<key>CFBundleIdentifier<\/key>\n.*<string>.*<\/string>.*/
    );
    if (searchValue2 != null) {
      rf = rf.replace(
        searchValue2[0],
        "    <key>CFBundleIdentifier</key>\n    <string>" + appId + "</string>"
      );
    }
    fs.writeFileSync(path, rf, "utf-8");
    console.log("success [ios] configure ios,file path:" + path);
  }
}

// check file path
function exists(path) {
  return fs.existsSync(path) || path.existsSync(path);
}

function isFile(path) {
  return exists(path) && fs.statSync(path).isFile();
}

function isDir(path) {
  return exists(path) && fs.statSync(path).isDirectory();
}

function getAndroidAllFile(dir, findOne) {
  if (typeof findOne !== "function") {
    throw new TypeError('The argument "findOne" must be a function');
  }
  eachFileSync(spath.resolve(dir), findOne);
}

function getIosAllFile(dir, findOne) {
  if (typeof findOne !== "function") {
    throw new TypeError('The argument "findOne" must be a function');
  }

  eachFileSync(spath.resolve(dir), findOne);
}

function eachFileSync(dir, findOne) {
  try {
    const stats = fs.statSync(dir);
    findOne(dir, stats);
    // foreach subdirectory
    if (stats.isDirectory()) {
      var files = fullPath(dir, fs.readdirSync(dir));
      files.forEach(function (f) {
        eachFileSync(f, findOne);
      });
    }
  } catch (err) {
    console.log('it does not exist', err);
  }
}

function fullPath(dir, files) {
  return files.map(function (f) {
    return spath.join(dir, f);
  });
}