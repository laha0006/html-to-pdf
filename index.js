import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const htmlFromQuill = `<p class="ql-align-center"><strong><em><u>test tested align</u></em></strong></p><p>test</p>`;

const quillCss = fs.readFileSync(path.resolve("./quill.core.css"), "utf8");

// console.log("css:", quillCss);

const fullHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<style>
${quillCss}
</style>
</head>
<body>
<div class="ql-container">
<div class="ql-editor">
${htmlFromQuill}
</div>
</div>
</body>
</html>
`;

// Step 4 - pass to puppeteer and create PDF
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "networkidle0" });
    await page.screenshot({ path: "debug.png", fullPage: true });

    await page.pdf({
        path: "output.pdf",
        format: "A4",
        printBackground: true,
    });

    await browser.close();
    console.log("PDF generated: output.pdf");
})();
