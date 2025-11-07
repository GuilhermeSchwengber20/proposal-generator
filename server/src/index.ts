import express from "express";
import cors from "cors";
import proposalRoutes from "./routes/ProposalRoute";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", proposalRoutes);
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

