$(document).ready(function () {
    external.invoke('start_update');
});

function patchingStatusReady() {
    $("#download-progress-bar")
        .css("width", "100%")
        .attr("aria-valuenow", "100")
        .removeClass("bg-warning")
        .removeClass("bg-danger")
        .addClass("bg-success");
    $("#download-progress-text").text("Ready");
    $("#button-play").prop('disabled', false);
}

function patchingStatusError(errorMsg) {
    $("#download-progress-bar")
        .css("width", "100%")
        .attr("aria-valuenow", "100")
        .removeClass("bg-success")
        .removeClass("bg-warning")
        .addClass("bg-danger");
    $("#download-progress-text").text("Failure: " + errorMsg);
}

function patchingStatusDownloading(nbDownloaded, nbTotal, bytesPerSec) {
    var percentage = (100 * nbDownloaded) / nbTotal;
    if (bytesPerSec > 0) {
        var downloadSpeed = " - " + humanFileSize(bytesPerSec) + "/s";
    } else {
        var downloadSpeed = "";
    }
    $("#download-progress-bar").css("width", percentage + "%").attr("aria-valuenow", percentage)
        .removeClass("bg-success")
        .removeClass("bg-danger")
        .addClass("bg-warning");
    $("#download-progress-text").text("Downloading: " + nbDownloaded + "/" + nbTotal + downloadSpeed);
}

function patchingStatusInstalling(nbInstalled, nbTotal) {
    var percentage = (100 * nbInstalled) / nbTotal;
    $("#download-progress-bar").css("width", percentage + "%").attr("aria-valuenow", percentage)
        .removeClass("bg-success")
        .removeClass("bg-danger")
        .addClass("bg-warning");
    $("#download-progress-text").text("Installing: " + nbInstalled + "/" + nbTotal);
}

function patchingStatusPatchApplied(fileName) {
    $("#download-progress-bar")
        .css("width", "100%")
        .attr("aria-valuenow", "100")
        .removeClass("bg-warning")
        .removeClass("bg-danger")
        .addClass("bg-success");
    $("#download-progress-text").text("Successfully applied patch: " + fileName);
}

function notificationInProgress() {
    $('#notificationInProgressToast').toast('show');
}

function resetCache() {
    external.invoke('reset_cache');
    $('#cacheResetToast').toast('show');
}

function updateProgressBar(value) {
    const progressBar = document.getElementById('download-progress-bar');
    const progressText = document.getElementById('download-progress-text');
    
    progressBar.style.width = value + '%';
    progressText.innerText = value + '%';
}


// Note: Function taken from https://stackoverflow.com/a/20732091
function humanFileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kiB', 'MiB', 'GiB', 'TiB'][i];
}

function startGame() {
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    if (login == "" || password == "") {
        return false;
    }
    // Invoke the patcher's 'login' function
    external.invoke(JSON.stringify({
        function: 'login',
        parameters: {
            'login': login, 'password': password
        }
    }));
    return true;
}