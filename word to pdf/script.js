document.getElementById('converterForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    
    var fileInput = document.getElementById('wordFile');
    var file = fileInput.files[0];
    
    if (!file) {
      alert('Please select a Word file');
      return;
    }
    
    if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      alert('Please select a valid Word file (DOCX)');
      return;
    }
    
    var formData = new FormData();
    formData.append('wordFile', file);
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/convert', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var downloadLink = document.getElementById('downloadLink');
        downloadLink.href = '/download?file=' + xhr.responseText;
        downloadLink.style.display = 'block';
      }
    };
    xhr.send(formData);
  });
  