import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendEmail = async (email, username, bookTitle, dueDate) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Lembrete: Devolução de Livros",
    // text ou html
    html: `<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lembrete da Biblioteca</title>
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #f0f0f5; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; font-size: 24px; margin: 0;">📚 Lembrete da Biblioteca Comunitária</h2>
        </div>
        <div style="padding: 30px; text-align: left; line-height: 1.6;">
            <p style="font-size: 18px; color: #333;">Olá, ${username}</p>
            <p style="font-size: 16px; color: #555;">Este é um lembrete para a devolução do livro <strong style="color: #FF5722;">"${bookTitle}"</strong>.</p>
            <p style="font-size: 16px; color: #555;">Data de devolução: <strong style="color: #FF5722;">${dueDate}</strong></p>
            <p style="font-size: 16px; color: #555;">Por favor, devolva o livro até a data indicada para evitar multas ou restrições de empréstimo.</p>
            <p style="font-size: 16px; color: #555;">Agradecemos por utilizar nossa biblioteca e esperamos vê-lo em breve!</p>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center;">
            <p style="font-size: 14px; color: #999; margin: 0;">Atenciosamente,</p>
            <p style="font-size: 14px; color: #999; margin: 0;">Equipe da Biblioteca Comunitária</p>
        </div>
        <div style="background-color: #4CAF50; padding: 10px; text-align: center;">
            <a href="#" style="font-size: 14px; color: #ffffff; text-decoration: none;">🔗 Visite nossa Biblioteca Online</a>
        </div>
    </div>
</body>
</html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("erro ao enviar o e-mail:", error);
    } else {
      console.log("E-mail enviado>:", info.response);
      console.log("informações:", info);
    }
  });
};

export default sendEmail;
