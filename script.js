document.getElementById('convertBtn').addEventListener('click', function() {
   const input = document.getElementById('imageInput');
   if (input.files && input.files[0]) {
       const reader = new FileReader();
       
       reader.onload = function(e) {
           const imgElement = document.createElement('img');
           imgElement.src = e.target.result;
           imgElement.onload = function() {
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d');
               canvas.width = imgElement.width;
               canvas.height = imgElement.height;
               
               ctx.drawImage(imgElement, 0, 0, imgElement.width, imgElement.height);
               const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
               const data = imageData.data;
               
               for (let i = 0; i < data.length; i += 4) {
                   const grey = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
                   data[i] = grey;
                   data[i + 1] = grey;
                   data[i + 2] = grey;
               }
               
               ctx.putImageData(imageData, 0, 0);
               
               const imageContainer = document.getElementById('imageContainer');
               imageContainer.innerHTML = '';
               imageContainer.appendChild(canvas);
           };
       };
       
       reader.readAsDataURL(input.files[0]);
   }
});
