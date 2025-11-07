import Company from "./Company";
import Client from "./Client";
import ProposalDetails from "./ProposalDetails";
import ItemProposal from "./ItemProposal";

export interface Proposal {
    company: Company;
    client: Client;
    proposal: ProposalDetails;
    paymentMethod: string;
    items: ItemProposal[];
    validity: number;
    notes?: string;
}