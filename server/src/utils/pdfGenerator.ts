import { Proposal } from "models/Proposal";
import PDFDocument from "pdfkit";

export const generateProposalPDF = async (proposalData: Proposal): Promise<Buffer> => {
    return new Promise(async (resolve) => {
    const {
      company,
      client,
      proposal,
      items,
      paymentMethod,
      validity,
      notes,
    } = proposalData;
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });
    doc.registerFont("Helvetica", "Helvetica");
    doc.font("Helvetica");

    const buffers: Buffer[] = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    
    // HEADER
    doc.font("Helvetica").fontSize(20).text(company.name, { align: "left" });
    doc.fontSize(12).text(company.contact, { align: "left"});

    // IMAGEM
    if (company?.logo) {
        const logoBase64 = company.logo.replace(/^data:image\/\w+;base64,/, "");
        const logoBuffer = Buffer.from(logoBase64, "base64");
        try {
            doc.image(logoBuffer, 440, 10, { width: 100 });
        } catch (error) {
            console.warn("Failed to load company logo:", error);
        }
    }


    doc.rect(40, 100, 515, 0.2).stroke();;
    doc.moveDown(4);

    // Cliente Info
    doc.font("Helvetica").fontSize(16).text("Cliente", { align: "left" }).moveDown(0.2);

    doc.fontSize(12).text(`${client.name}`);
    doc.text(`${client.phone}`);
    doc.text(`${client.email}`);
    doc.text(`${client.company}`);
    doc.moveDown(2);

    // Proposal Info
    doc.font("Helvetica").fontSize(16).text(proposal.title, { align: "left" }).moveDown(0.2);
    doc.fontSize(12).text(proposal.description).moveDown(2);


    doc.table({
      rowStyles: { border: [0, 0, 1, 0], borderColor: "black", padding: 5 },
      
      data: [
        ["Descrição", "Qtd", "Valor Unitário", "Subtotal"],
        ...items.map((item) => [item.name, item.quantity.toString(), `R$ ${item.price.toFixed(2)}`, `R$ ${(item.quantity * item.price).toFixed(2)}`]),
      ]
    }).moveDown(0.2);

    doc.text(`Total: R$ ${total.toFixed(2)}`, { align: "right" });

    doc.moveDown(2);

    doc.font("Helvetica").fontSize(16).text("Condições comerciais").moveDown(0.5);
    doc.font("Helvetica").fontSize(12).text("Forma de pagamento:").moveDown(0.2);
    doc.text(paymentMethod).moveDown(0.2);
    doc.text(`Validade: ${validity} dias`).moveDown();
    doc.text("Observações:").moveDown(0.2);
    doc.text(notes).moveDown(2);
    
    doc.end();
  });
}