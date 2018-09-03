const path = require('path');
const fs = require('fs');

exports.main = (req, res) => {
    // Parse the url to get the directory to read
    var file_path = req.url;
    fs.readdir("public/images" + decodeURI(req.url), function(err, items) {
        if (err) {
            res.render('error.html');
        } else {  
            var images = [];
            var videos = [];
            var dirs = [];

            items.forEach(item => {
                switch (path.extname(item)) {
                    case ".jpg":
                    case ".png":
                    case ".JPG":
                    case ".PNG":
                        var img = {};
                        img["file"] = item;
                        var text_name = item.substring(0, item.indexOf('.'))
                        try {
                            img["text"] = fs.readFileSync("public/images" + decodeURI(file_path) + "/" + text_name + ".txt", "utf8", function(err, data) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        } catch (exception) {
                            img["text"] = undefined;
                        }
                        images.push(img);
                        break; 
                    case ".txt":
                        break;
                    case ".mp4":
                    case ".MP4":
                    case ".mov":
                    case ".MOV":
                        var vid = {};
                        vid["file"] = item;
                        var text_name = item.substring(0, item.indexOf('.'));
                        try {
                            vid["text"] = fs.readFileSync("public/images" + decodeURI(file_path) + "/" + text_name + ".txt", "utf8", function(err, data) {
                                if (err) {
                                    console.log(err);
                                } 
                            });
                        } catch (exception) {
                            vid["text"] = undefined;
                        }
                        videos.push(vid);
                        break;
                    default:
                        dirs.push(item);
                        break;
                }
            });

            res.render('index.ejs', { 
                images: images,
                videos: videos,
                dirs: dirs,
                file_path: file_path
            });
        }
    })
};