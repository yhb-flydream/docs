var ua = navigator.userAgent;
if (ua.indexOf('Windows')>-1){

}else if (ua.indexOf('Android')>-1){
    document.write('<meta name="viewport" content="width=720, user-scalable=no,minimal-ui"/>');
    if (ua.indexOf('HUAWEI')>-1){
        document.write('<meta name="viewport" content="width=720, user-scalable=no,minimal-ui"/>');
    }
}else if (ua.indexOf('iPad')>-1){
    document.write('<meta name="viewport" content="width=800, user-scalable=no,minimal-ui"/>');
}else {
    document.write('<meta name="viewport" content="width=800, user-scalable=no,minimal-ui"/>');
}