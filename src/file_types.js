var fileTypes = module.exports;


fileTypes.png = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 137 &&
        buf[1] === 80 &&
        buf[2] === 78 &&
        buf[3] === 71
    );
};

fileTypes.jpg = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 255 &&
        buf[1] === 216 &&
        buf[2] === 255
    );
};

fileTypes.gif = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 71 &&
        buf[1] === 73 &&
        buf[2] === 70
    );
};

fileTypes.webp = function(buf) {
    if (!buf || buf.length < 12) {
        return false;
    }

    return (
        buf[8] === 87 &&
        buf[9] === 69 &&
        buf[10] === 66 &&
        buf[11] === 80
    );
};

fileTypes.tif = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 73 &&
        buf[1] === 73 &&
        buf[2] === 42 &&
        buf[3] === 0
    ) || (
        buf[0] === 77 &&
        buf[1] === 77 &&
        buf[2] === 0 &&
        buf[3] === 42
    );
};

fileTypes.bmp = function(buf) {
    if (!buf || buf.length < 2) {
        return false;
    }

    return buf[0] === 66 && buf[1] === 77;
};

fileTypes.jxr = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 73 &&
        buf[1] === 73 &&
        buf[2] === 188
    );
};

fileTypes.psd = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 56 &&
        buf[1] === 66 &&
        buf[2] === 80 &&
        buf[3] === 83
    );
};

fileTypes["7z"] = function(buf) {
    if (!buf || buf.length < 5) {
        return false;
    }

    return (
        buf[0] === 55 &&
        buf[1] === 122 &&
        buf[2] === 188 &&
        buf[3] === 175 &&
        buf[4] === 39 &&
        buf[5] === 28
    );
};

fileTypes.bz2 = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 66 &&
        buf[1] === 90 &&
        buf[2] === 104
    );
};

fileTypes.gz = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        buf[0] === 31 &&
        buf[1] === 139 &&
        buf[2] === 8
    );
};

fileTypes.rar = function(buf) {
    if (!buf || buf.length < 7) {
        return false;
    }

    return (
        buf[0] === 82 &&
        buf[1] === 97 &&
        buf[2] === 114 &&
        buf[3] === 33 &&
        buf[4] === 26 &&
        buf[5] === 7 && (
            buf[6] === 0 ||
            buf[6] === 1
        )
    );
};

fileTypes.tar = function(buf) {
    if (!buf || buf.length < 262) {
        return false;
    }

    return (
        buf[257] === 117 &&
        buf[258] === 115 &&
        buf[259] === 116 &&
        buf[260] === 97 &&
        buf[261] === 114
    );
};

fileTypes.zip = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 80 &&
        buf[1] === 75 && (
            buf[2] === 3 ||
            buf[2] === 5 ||
            buf[2] === 7
        ) && (
            buf[3] === 4 ||
            buf[3] === 6 ||
            buf[3] === 8
        )
    );
};

fileTypes.pdf = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 37 &&
        buf[1] === 80 &&
        buf[2] === 68 &&
        buf[3] === 70
    );
};

fileTypes.epub = function(buf) {
    if (!buf || buf.length < 58) {
        return false;
    }

    return (
        buf[0] === 80 &&
        buf[1] === 75 &&
        buf[2] === 3 &&
        buf[3] === 4 &&
        buf.slice(30, 58).toString() === "mimetypeapplication/epub+zip"
    );
};

fileTypes.exe = function(buf) {
    if (!buf || buf.length < 2) {
        return false;
    }

    return (
        buf[0] === 77 &&
        buf[1] === 90
    );
};

fileTypes.mp3 = function(buf) {
    if (!buf || buf.length < 3) {
        return false;
    }

    return (
        (
            buf[0] === 73 &&
            buf[1] === 68 &&
            buf[2] === 51
        ) || (
            buf[0] === 255 &&
            buf[1] === 251
        )
    );
};

fileTypes.flac = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 102 &&
        buf[1] === 76 &&
        buf[2] === 97 &&
        buf[3] === 67
    );
};

fileTypes.wav = function(buf) {
    if (!buf || buf.length < 12) {
        return false;
    }

    return (
        buf[0] === 82 &&
        buf[1] === 73 &&
        buf[2] === 70 &&
        buf[3] === 70 &&
        buf[8] === 87 &&
        buf[9] === 65 &&
        buf[10] === 86 &&
        buf[11] === 69
    );
};

fileTypes.ogg = function(buf) {
    if (!buf || buf.length < 4) {
        return false;
    }

    return (
        buf[0] === 79 &&
        buf[1] === 103 &&
        buf[2] === 103 &&
        buf[3] === 83
    );
};

fileTypes.m4a = function(buf) {
    if (!buf || buf.length < 8) {
        return false;
    }

    return (
        (
            buf[4] === 102 &&
            buf[5] === 116 &&
            buf[6] === 121 &&
            buf[7] === 112
        ) || (
            buf[0] === 77 &&
            buf[1] === 52 &&
            buf[2] === 65 &&
            buf[3] === 32
        )
    );
};

fileTypes.mp4 = function(buf) {
    if (!buf || buf.length < 8) {
        return false;
    }

    return (
        (
            buf[0] === 0 &&
            buf[1] === 0 &&
            buf[2] === 0 &&
            buf[3] === 24 &&
            buf[4] === 102 &&
            buf[5] === 116 &&
            buf[6] === 121 &&
            buf[7] === 112
        ) || (
            buf[0] === 51 &&
            buf[1] === 103 &&
            buf[2] === 112 &&
            buf[3] === 53
        )
    );
};

fileTypes.swf = function(buf) {
    if (!buf || buf.length < 2) {
        return false;
    }

    return (
        (
            buf[0] === 67 ||
            buf[0] === 70
        ) &&
        buf[1] === 87 &&
        buf[2] === 83
    );
};

var re_svg = /<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>/;
fileTypes.svg = function(buf) {
    if (!buf) {
        return false;
    }

    return re_svg.test(buf);
};
