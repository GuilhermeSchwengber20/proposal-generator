import { Request, Response } from "express";
import { Proposal } from "../models/Proposal";
import ProposalService from "../services/ProposalService";

class ProposalController {

    constructor(private proposalService: ProposalService) {}

    async createProposal(req: Request, res: Response) {
        const proposal: Proposal = req.body;
        try {
            
            if(!proposal.company || !proposal.client || !proposal.proposal || !proposal.items) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            
            const pdfBuffer = await this.proposalService.createProposal(proposal);
            const filename = `${proposal.client.name.replace(/\s+/g, '_')}_`;

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}proposal.pdf`);
            return res.status(201).send(pdfBuffer);

        } catch (error) {
            console.error("Error creating proposal:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}


export default ProposalController;