
export function crearTicketTemplate(venta: {
  comprador: string;
  telefono: string;
  numeros: number[];
  estado: string;
  fecha?: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />

        <style>
          @page {
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            width: 80mm;
            background: #181c21;
            color: #ffffff;
            font-family: Arial, sans-serif;
          }

          .ticket {
            width: 100%;
            padding: 14px;
            background: #181c21;
          }

          /* HEADER */

          .header {
            text-align: center;
            padding-bottom: 12px;
            border-bottom: 1px dashed #363d47;
          }

          .logo {
            font-size: 26px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #4f7cff;
          }

          .subtitle {
            margin-top: 3px;
            font-size: 8px;
            color: #7d8590;
            letter-spacing: 1.5px;
          }

          /* BUYER */

          .buyer-card {
            margin-top: 12px;
            padding: 11px;
            text-align: center;
            background: #20252c;
            border: 1px solid #2c333d;
            border-radius: 9px;
          }

          .buyer-label {
            font-size: 8px;
            color: #7d8590;
            text-transform: uppercase;
            letter-spacing: 1.2px;
          }

          .buyer-name {
            margin-top: 5px;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff;
          }

          .phone {
            margin-top: 5px;
            font-size: 11px;
            color: #aeb6c2;
          }

          /* DATE */

          .date-card {
            margin-top: 9px;
            padding: 9px;
            text-align: center;
            background: #20252c;
            border: 1px solid #2c333d;
            border-radius: 9px;
          }

          .date-label {
            font-size: 8px;
            color: #7d8590;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 5px;
          }

          .date-value {
            margin-top: 4px;
            font-size: 12px;
            font-weight: bold;
            color: #dce2ea;
          }

          /* NUMBERS */

          .numbers-section {
            margin-top: 11px;
            padding: 12px 8px;
            text-align: center;
            background: #111418;
            border: 1px solid #303742;
            border-radius: 10px;
          }

          .numbers-title {
            font-size: 8px;
            color: #7d8590;
            text-transform: uppercase;
            letter-spacing: 1.3px;
          }

          .numbers {
            margin-top: 8px;
            font-size: 20px;
            font-weight: bold;
            line-height: 28px;
            color: #4f7cff;
            word-spacing: 4px;
          }

          /* STATUS */

          .status {
            margin-top: 10px;
            padding: 9px;
            text-align: center;
            background: #20252c;
            border: 1px solid #2c333d;
            border-radius: 9px;
          }

          .status-label {
            font-size: 8px;
            color: #7d8590;
            text-transform: uppercase;
            letter-spacing: 1.2px;
          }

          .status-value {
            margin-top: 4px;
            font-size: 11px;
            font-weight: bold;
            color: #22c55e;
          }

          /* FOOTER */

          .footer {
            margin-top: 10px;
            padding-top: 9px;
            text-align: center;
            border-top: 1px dashed #363d47;
          }

          .footer-main {
            font-size: 9px;
            font-weight: bold;
            color: #8b949e;
          }

          .footer-small {
            margin-top: 3px;
            font-size: 7px;
            color: #555d68;
          }
        </style>
      </head>

      <body>
        <div class="ticket">

          <div class="header">
            <div class="logo">RIFAST</div>
            <div class="subtitle">COMPROBANTE DE RIFA</div>
          </div>

          <div class="buyer-card">
            <div class="buyer-label">Comprador</div>

            <div class="buyer-name">
              ${venta.comprador}
            </div>

            <div class="phone">
            <div class="date-label">Fecha del sorteo</div>
                ${venta.fecha ?? ""}
            </div>
          </div>

          <div class="numbers-section">
            <div class="numbers-title">
              Números de la rifa
            </div>

            <div class="numbers">
              ${venta.numeros.join(" · ")}
            </div>
          </div>

          <div class="status">
            <div class="status-label">
              Estado
            </div>

            <div class="status-value">
              ● ${venta.estado}
            </div>
          </div>

          <div class="footer">
            <div class="footer-main">
              Gracias por participar
            </div>

            <div class="footer-small">
              Conserve este comprobante
            </div>
          </div>

        </div>
      </body>
    </html>
  `;
}



