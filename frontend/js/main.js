// js/main.js

// Fetch scholarships and display them
fetch('http://localhost:5000/api/scholarships')
  .then(response => response.json())
  .then(data => {
    const scholarshipList = document.getElementById('scholarship-list');
    data.forEach(scholarship => {
      const col = document.createElement('div');
      col.className = 'col-md-4';
      col.innerHTML = `
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${scholarship.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${scholarship.universityName}</h6>
            <p class="card-text">${scholarship.description.substring(0, 100)}...</p>
            <p class="card-text"><small class="text-muted">Deadline: ${new Date(scholarship.deadline).toLocaleDateString()}</small></p>
            <button class="btn btn-primary" onclick="viewDetails('${scholarship._id}')">View Details & Apply</button>
          </div>
        </div>
      `;
      scholarshipList.appendChild(col);
    });
  });

// View scholarship details
function viewDetails(id) {
  fetch(`http://localhost:5000/api/scholarships/${id}`)
    .then(response => response.json())
    .then(scholarship => {
      const modal = document.getElementById('scholarshipModal');
      modal.innerHTML = `
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${scholarship.scholarshipTitle}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h6>${scholarship.universityName}</h6>
              <p>${scholarship.description}</p>
              <p><strong>Minimum Requirements:</strong></p>
              <ul>
                ${scholarship.minimumRequirements.map(req => `<li>${req}</li>`).join('')}
              </ul>
              <p><small class="text-muted">Deadline: ${new Date(scholarship.applicationDeadline).toLocaleDateString()}</small></p>
              <h5>Apply Now</h5>
              <form id="application-form">
                <div class="form-group">
                  <label for="student-name">Name</label>
                  <input type="text" class="form-control" id="student-name" required>
                </div>
                <div class="form-group">
                  <label for="student-email">Email</label>
                  <input type="email" class="form-control" id="student-email" required>
                </div>
                <div class="form-group">
                  <label for="additional-details">Additional Details</label>
                  <textarea class="form-control" id="additional-details"></textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit Application</button>
              </form>
            </div>
          </div>
        </div>
      `;
      $('#scholarshipModal').modal('show');

      // Handle application submission
      document.getElementById('application-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const applicationData = {
          scholarshipId: scholarship._id,
          studentName: document.getElementById('student-name').value,
          email: document.getElementById('student-email').value,
          additionalDetails: document.getElementById('additional-details').value,
        };
        fetch('http://localhost:5000/api/students/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        })
          .then(response => response.json())
          .then(data => {
            alert('Application submitted successfully!');
            $('#scholarshipModal').modal('hide');
          })
          .catch(err => console.error(err));
      });
    });
}
