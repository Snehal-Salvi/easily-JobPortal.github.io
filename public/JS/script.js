//this is javascript confirm box before deleting job

function confirmDelete(id) {
    const result = confirm("Are you sure you want to delete this job?");
    if (result) {
        // If the user confirms, redirect to the delete route
        window.location.href = "/delete-job/" + id;
    }
}
