const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with actual database in production)
let users = [];
let transporters = [];
let emergencyRequests = [];

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', message: 'AidGo API is running' });
});

// Register endpoint
app.post('/register', (req, res) => {
    try {
        const data = req.body;
        const role = data.role;
        
        if (role === 'transporter') {
            const transporterData = {
                ...data,
                id: Date.now().toString(),
                registration_date: new Date().toISOString(),
                status: 'pending_verification',
                is_online: false,
                total_rides: 0,
                rating: 0.0
            };
            transporters.push(transporterData);
            res.json({
                message: 'Transporter registered successfully',
                id: transporterData.id
            });
        } else {
            const patientData = {
                ...data,
                id: Date.now().toString(),
                registration_date: new Date().toISOString()
            };
            users.push(patientData);
            res.json({
                message: 'Patient registered successfully',
                id: patientData.id
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Request help endpoint
app.post('/request-help', (req, res) => {
    try {
        const data = req.body;
        
        const emergencyRequest = {
            id: Date.now().toString(),
            patient_id: data.patientId,
            name: data.name,
            location: data.location,
            timestamp: data.timestamp || new Date().toISOString(),
            status: 'pending',
            created_at: new Date().toISOString(),
            accepted_by: null,
            accepted_at: null
        };
        
        emergencyRequests.push(emergencyRequest);
        
        res.json({
            message: 'Emergency request created successfully',
            request_id: emergencyRequest.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get requests endpoint
app.get('/get-requests', (req, res) => {
    try {
        const pendingRequests = emergencyRequests.filter(req => req.status === 'pending');
        res.json(pendingRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accept request endpoint
app.post('/accept-request/:req_id', (req, res) => {
    try {
        const reqId = req.params.req_id;
        const requestIndex = emergencyRequests.findIndex(r => r.id === reqId);
        
        if (requestIndex !== -1) {
            emergencyRequests[requestIndex].status = 'accepted';
            emergencyRequests[requestIndex].accepted_at = new Date().toISOString();
            emergencyRequests[requestIndex].accepted_by = req.body?.transporter_id || null;
            
            res.json({ message: 'Request accepted successfully' });
        } else {
            res.status(404).json({ error: 'Request not found or already accepted' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update transporter status endpoint
app.post('/transporter-status/:transporter_id', (req, res) => {
    try {
        const transporterId = req.params.transporter_id;
        const { is_online } = req.body;
        
        const transporterIndex = transporters.findIndex(t => t.id === transporterId);
        
        if (transporterIndex !== -1) {
            transporters[transporterIndex].is_online = is_online;
            transporters[transporterIndex].last_updated = new Date().toISOString();
            
            res.json({ message: 'Status updated successfully' });
        } else {
            res.status(404).json({ error: 'Transporter not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get online transporters endpoint
app.get('/get-online-transporters', (req, res) => {
    try {
        const onlineTransporters = transporters.filter(t => 
            t.is_online === true && t.status === 'verified'
        );
        res.json(onlineTransporters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`AidGo API server running on http://localhost:${port}`);
});