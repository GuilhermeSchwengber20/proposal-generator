import { Router } from "express";
import ProposalController from "../controllers/ProposalController";
import ProposalService from "../services/ProposalService";

const proposalService = new ProposalService();
const proposalController = new ProposalController(proposalService);

const router = Router();


router.post("/proposals", (req, res) => proposalController.createProposal(req, res));

export default router;