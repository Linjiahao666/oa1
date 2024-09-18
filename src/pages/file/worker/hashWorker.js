import SparkMd5 from "spark-md5";

addEventListener("message", (e) => {
  const { chunks } = e.data;
  console.log(chunks);
  hash(chunks).then((res) => {
    postMessage(res);
  });
});
function hash(chunks) {
  return new Promise((resolve, reject) => {
    const spark = new SparkMd5();
    function _read(i) {
      if (i >= chunks.length) {
        resolve(spark.end());
        return;
      }
      const reader = new FileReader();
      const blob = chunks[i];
      reader.onload = (e) => {
        spark.append(e.target.result);
        _read(i + 1);
      };
      reader.readAsArrayBuffer(blob);
    }
    _read(0);
  });
}
