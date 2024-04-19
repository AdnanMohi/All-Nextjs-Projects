
import Tenant from "@/models/tenantSchema";
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method === 'POST') {
        // Create Tenant Endpoint
        try {
            const { name, description, administrators } = req.body;
            const tenant = new Tenant({ name, description, administrators });
            await tenant.save();
            res.status(201).json(tenant);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'GET') {
        // Get All Tenants Endpoint
        try {
            const tenants = await Tenant.find();
            res.json(tenants);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    } else {
        const { id } = req.query;
        if (req.method === 'GET') {
            // Get Single Tenant Endpoint
            try {
                const tenant = await Tenant.findById(id);
                if (!tenant) {
                    return res.status(404).json({ message: 'Tenant not found' });
                }
                res.json(tenant);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        } else if (req.method === 'PUT') {
            // Update Tenant Endpoint
            try {
                const { name, description, administrators } = req.body;
                const updatedTenant = await Tenant.findByIdAndUpdate(id, { name, description, administrators }, { new: true });
                if (!updatedTenant) {
                    return res.status(404).json({ message: 'Tenant not found' });
                }
                res.json(updatedTenant);
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        } else if (req.method === 'DELETE') {
            // Delete Tenant Endpoint
            try {
                const deletedTenant = await Tenant.findByIdAndDelete(id);
                if (!deletedTenant) {
                    return res.status(404).json({ message: 'Tenant not found' });
                }
                res.json({ message: 'Tenant deleted successfully' });
            } catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    }
}
