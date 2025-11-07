import { Proposal } from "../models/Proposal";
import { generateProposalPDF } from "../utils/pdfGenerator";

class ProposalService {
    async createProposal(data: Proposal): Promise<Buffer>{
        // call pdfGenerations utils

        const pdfBuffer = await generateProposalPDF(data);

        return pdfBuffer;
    }
}

export default ProposalService;