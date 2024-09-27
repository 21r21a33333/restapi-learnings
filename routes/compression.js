
const router = require('express').Router();
// Sample employee data
const employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer' },
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer' },
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer' },
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer' },
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer' },
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer' },
    { id: 1, name: 'John Doe', position: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer' },
];

// Endpoint to get all employees
router.get('/employees', (req, res) => {
    res.set({
        'Cache-Control': 'public, max-age=3600, s-maxage=7200, must-revalidate'
    });
    res.json(employees);
});

// Endpoint to get a specific employee by ID
router.get('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id, 10);
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
});


module.exports = router;