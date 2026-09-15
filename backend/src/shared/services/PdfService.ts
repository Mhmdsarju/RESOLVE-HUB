import PDFDocument from "pdfkit";
import path from "path";
import { PaymentReportDTO } from "../../modules/organization/application/dto/PaymentReportDTO";
import { IPdfService } from "./interface/IPdfService";

export class PdfService implements IPdfService {
    generatePaymentReport(data: PaymentReportDTO): PDFKit.PDFDocument {
        const document = new PDFDocument({
            margin: 40,
            size: "A4",
        });

        const pageWidth = document.page.width;
        const pageHeight = document.page.height;

        const colors = {
            background: "#EDEAE3",
            dark: "#4B3932",
            cream: "#F3E7D3",
            border: "#D8C4A8",
            light: "#F7F2E9",
            card: "#FBF6EC",
            text: "#5A4A4A",
            muted: "#8A7A72",
            white: "#FFFFFF",
            success: "#2F7D5A",
            successBg: "#EAF5EE",
            warning: "#9C7B3F",
            warningBg: "#FBF6EC",
            danger: "#B4534B",
            dangerBg: "#FBEDEC",
        };

        const logoPath = path.join(
            process.cwd(),
            "src",
            "assets",
            "resolvehub-logo.png",
        );

        const drawPageBackground = () => {
            document.rect(0, 0, pageWidth, pageHeight)
                .fill(colors.background);
        };

        const drawHeader = () => {
            document.roundedRect(30, 30, pageWidth - 60, 125, 14)
                .fill(colors.dark);

            document.roundedRect(
                pageWidth / 2 - 32,
                48,
                64,
                64,
                12,
            )
                .fill(colors.cream);

            document.image(logoPath, pageWidth / 2 - 27, 53, {
                fit: [54, 54],
                align: "center",
                valign: "center",
            });

            document.fontSize(23)
                .font("Helvetica-Bold")
                .fillColor(colors.cream)
                .text("ResolveHub", 30, 118, {
                    width: pageWidth - 60,
                    align: "center",
                });

            document.fontSize(9)
                .font("Helvetica")
                .fillColor(colors.border)
                .text(
                    "PAYMENT & REVENUE REPORT",
                    30,
                    143,
                    {
                        width: pageWidth - 60,
                        align: "center",
                    },
                );
        };

        const drawSummaryCard = (
            x: number,
            y: number,
            width: number,
            label: string,
            value: string,
        ) => {
            document.roundedRect(x, y, width, 70, 10)
                .fill(colors.card)
                .lineWidth(1)
                .stroke(colors.border);

            document.fontSize(8)
                .font("Helvetica-Bold")
                .fillColor(colors.muted)
                .text(label.toUpperCase(), x + 12, y + 13, {
                    width: width - 24,
                });

            document.fontSize(17)
                .font("Helvetica-Bold")
                .fillColor(colors.dark)
                .text(value, x + 12, y + 34, {
                    width: width - 24,
                });
        };

        const drawStatus = (
            status: string,
            x: number,
            y: number,
        ) => {
            const normalizedStatus = status.toUpperCase();

            const isSuccess = normalizedStatus === "SUCCESS";
            const isPending = normalizedStatus === "PENDING";

            const background = isSuccess
                ? colors.successBg
                : isPending
                    ? colors.warningBg
                    : colors.dangerBg;

            const text = isSuccess
                ? colors.success
                : isPending
                    ? colors.warning
                    : colors.danger;

            document.roundedRect(x, y, 55, 18, 9)
                .fill(background);

            document.fontSize(7)
                .font("Helvetica-Bold")
                .fillColor(text)
                .text(normalizedStatus, x, y + 6, {
                    width: 55,
                    align: "center",
                });
        };

        const drawFooter = () => {
            const y = pageHeight - 82;

            document.moveTo(40, y - 12)
                .lineTo(pageWidth - 40, y - 12)
                .lineWidth(0.5)
                .stroke(colors.border);

            document.fontSize(9)
                .font("Helvetica-Bold")
                .fillColor(colors.dark)
                .text("ResolveHub", 40, y);

            document.fontSize(7.5)
                .font("Helvetica")
                .fillColor(colors.muted)
                .text(
                    "Enterprise Incident Management & War Room Collaboration",
                    40,
                    y + 14,
                );

            document.fontSize(7)
                .fillColor("#B0A18F")
                .text(
                    "© 2026 ResolveHub. All rights reserved.",
                    pageWidth - 220,
                    y + 4,
                    {
                        width: 180,
                        align: "right",
                    },
                );
        };

        const drawTransactionHeader = (y: number) => {
            document.roundedRect(
                40,
                y,
                pageWidth - 80,
                28,
                6,
            ).fill(colors.dark);

            document.fontSize(7.5)
                .font("Helvetica-Bold")
                .fillColor(colors.cream);

            document.text("ORGANIZATION", 48, y + 10);
            document.text("PLAN", 185, y + 10);
            document.text("AMOUNT", 245, y + 10);
            document.text("STATUS", 320, y + 10);
            document.text("PAID AT", 390, y + 10);
        };

        const drawTransaction = (
            payment: PaymentReportDTO["payments"][number],
            y: number,
            index: number,
        ) => {
            const rowHeight = 38;
            const background = index % 2 === 0
                ? colors.white
                : colors.light;

            document.rect(40, y, pageWidth - 80, rowHeight)
                .fill(background);

            document.fontSize(8)
                .font("Helvetica-Bold")
                .fillColor(colors.dark)
                .text(
                    payment.organizationName,
                    48,
                    y + 8,
                    {
                        width: 125,
                        ellipsis: true,
                    },
                );

            document.fontSize(7.5)
                .font("Helvetica")
                .fillColor(colors.text)
                .text(payment.plan, 185, y + 8, {
                    width: 50,
                    ellipsis: true,
                });

            document.fontSize(7.5)
                .font("Helvetica-Bold")
                .fillColor(colors.text)
                .text(
                    `${payment.currency} ${payment.amount.toLocaleString("en-IN")}`,
                    245,
                    y + 8,
                    {
                        width: 70,
                    },
                );

            drawStatus(payment.status, 320, y + 5);

            document.fontSize(7)
                .font("Helvetica")
                .fillColor(colors.muted)
                .text(
                    payment.paidAt
                        ? payment.paidAt.toLocaleDateString("en-IN")
                        : "-",
                    390,
                    y + 8,
                    {
                        width: 80,
                    },
                );

            document.fontSize(6.5)
                .fillColor(colors.muted)
                .text(
                    payment.transactionId || payment.razorpayOrderId,
                    470,
                    y + 8,
                    {
                        width: 75,
                        ellipsis: true,
                    },
                );

            document.moveTo(40, y + rowHeight)
                .lineTo(pageWidth - 40, y + rowHeight)
                .lineWidth(0.4)
                .stroke(colors.border);
        };

        drawPageBackground();
        drawHeader();

        document.fontSize(8)
            .font("Helvetica")
            .fillColor(colors.muted)
            .text(
                `Generated on ${new Date().toLocaleString("en-IN")}`,
                40,
                170,
                {
                    width: pageWidth - 80,
                    align: "right",
                },
            );

        const cardGap = 10;
        const cardWidth = (pageWidth - 80 - cardGap * 2) / 3;

        drawSummaryCard(
            40,
            195,
            cardWidth,
            "Total Payments",
            data.totalPayments.toLocaleString("en-IN"),
        );

        drawSummaryCard(
            40 + cardWidth + cardGap,
            195,
            cardWidth,
            "Successful",
            data.successfulPayments.toLocaleString("en-IN"),
        );

        drawSummaryCard(
            40 + (cardWidth + cardGap) * 2,
            195,
            cardWidth,
            "Total Revenue",
            `₹${data.totalRevenue.toLocaleString("en-IN")}`,
        );

        document.fontSize(14)
            .font("Helvetica-Bold")
            .fillColor(colors.dark)
            .text("Transaction History", 40, 290);

        document.fontSize(8)
            .font("Helvetica")
            .fillColor(colors.muted)
            .text(
                `${data.totalPayments.toLocaleString("en-IN")} payment transactions`,
                40,
                309,
            );

        let currentY = 330;

        drawTransactionHeader(currentY);
        currentY += 28;

        data.payments.forEach((payment, index) => {
            if (currentY + 38 > pageHeight - 100) {
                drawFooter();

                document.addPage();

                drawPageBackground();
                drawHeader();

                currentY = 175;

                document.fontSize(14)
                    .font("Helvetica-Bold")
                    .fillColor(colors.dark)
                    .text("Transaction History", 40, currentY);

                currentY += 28;

                drawTransactionHeader(currentY);
                currentY += 28;
            }

            drawTransaction(payment, currentY, index);
            currentY += 38;
        });

        if (data.payments.length === 0) {
            document.roundedRect(
                40,
                currentY + 10,
                pageWidth - 80,
                60,
                10,
            )
                .fill(colors.card)
                .stroke(colors.border);

            document.fontSize(9)
                .font("Helvetica")
                .fillColor(colors.muted)
                .text(
                    "No payment transactions available.",
                    40,
                    currentY + 33,
                    {
                        width: pageWidth - 80,
                        align: "center",
                    },
                );
        }

        drawFooter();

        return document;
    }
}