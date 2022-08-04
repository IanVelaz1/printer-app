import { Injectable } from '@angular/core';
import { DICOPRINT_LOGO } from './imageExports';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class NoteGenerationService {

  constructor() { }

  generateAndPrintPdf(data) {
    const itemsWithObservations = data?.items?.filter(item => item?.observations?.length > 0);
    const heights = [...data?.items.map(item => 25)];
    let docDefinition = {
      content: [
        {
          image: DICOPRINT_LOGO,
          fit: [100, 100],
        },
        {
          text: 'DICOPRINT',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: '777-228-03-76',
          fontSize: 13,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'RECIBO',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Detalle de cliente',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: `Nombre: ${data?.client?.name}`,
                bold:true
              },
              {
                text: `Telefono: ${data?.client?.address?.phone}`,
                bold:true
              },
            /*   { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo } */
            ],
            [
              {
                text: `WhatsApp: 777-120-41-67`,
                alignment: 'right'
              },
              {
                text: `Email: colorHouse@hotmail.com`,
                alignment: 'right'
              },
              {
                text: `Fecha: ${new Date(data?.noteDate).toLocaleString('es-MX')}`,
                alignment: 'right'
              },
              { 
                text: `Id venta : ${data?._id}`,
                alignment: 'right'
              },
              { 
                text: `Fecha de entrega : ${data?.items[0] && data?.items[0].deliveryDate ? new Date(data?.items[0].deliveryDate).toLocaleString('es-MX'): ''}`,
                alignment: 'right'
              },
              { 
                text: `Hora de entrega : ${data?.items[0] && data?.items[0].deliveryTime ? data?.items[0].deliveryTime : ''}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Detalle de orden',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto'],
            heights: [20, ...heights, 35, 35, 35],
            body: [
              ['Cantidad', 'Descripcion', 'Precio', 'Total'],
              ...data?.items.map(p => ([p.quantity, p.fileName, `$${p?.isPrintingItem ? p.unitTotalPrice : p.unitPrice}`, `$${this.getItemSubTotal(p).toFixed(2)}`])),
              [{text: 'Pagado', colSpan: 3}, {}, {}, `$${Number(data?.amountPayed).toFixed(2)}`],
              [{text: 'Por Pagar', colSpan: 3}, {}, {}, `$${Number(data?.totalSalePrice -  data?.amountPayed).toFixed(2)}`],
              [{text: 'Total', colSpan: 3}, {}, {}, `$${this.getTotalItemSum(data).toFixed(2)}`]
            ]
          }
        },
        {
          text: 'Observaciones',
          style: 'sectionHeader'
        },
        {
          ul: [...itemsWithObservations.map(item => `${item.fileName} - ${item.observations}`)],
          margin: [0, 0 ,0, 15]
        },
        /* {
          columns: [
            [{ qr: `${this.invoice.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        }, */
        {
          text: 'Instrucciones adicionales',
          style: 'sectionHeaderMargin'
        },
        { 
          text: `TODO TRABAJO REQUIERE DE UN 50% DE ANTICIPO PARA SU ELABORACIÓN / TODA MODIFICACIÓN DE ARCHIVOS GENERA UN COSTO ADICIONAL / REVISE SU MATERIAL, SALIDA LA MERCANCIA
          NO SE ACEPTAN RECLAMACIONES NI DEVOLUCIONES / RECOGA SU MATERIAL A TIEMPO, TRANSCURRIDOS 20 DIAS DESPUES DE LA FECHA DE ENTREGA, NO NOS HACEMOS RESPONSABLES
          POR ÉSTE / EN TODA CANCELACIÓN SE COBRARÁ UN 20% DEL TOTAL DEL PEDIDO/ CUALQUIER TRABAJO URGENTE GENERA UN COSTO ADICIONAL DEL 30% SOBRE NUESTROS PRECIOS
          CONVENCIONALES / EN TODO TRABAJO DE DISEÑO NUESTRA RESPONSABILIDAD TERMINA CUANDO USTED AUTORIZA LA IMPRESION DEL MISMO. LE SUPLICAMOS REVISAR A DETALLE SUS
          ORIGINALES DIGITALES ANTES DE IMPRIMIR EN NUESTRAS INSTALACIONES O EN LA IMPRENTA DE SU PREFERENCIA POR LO QUE NO NOS RESPONSABILIZAMOS POR NEGATIVOS, PLACAS,
          PAPEL O NINGÚN OTRO MATERIAL ESTROPEADO A CONSECUENCIA DE ERRORES DE DISEÑO (FALTAS DE ORTOGRAFÍA, REDACCIÓN, FOTOS ERRONEAS, ETC).
          ESTE DOCUMENTO ES UNICAMENTE PARA CONTROL INTERNO, NO TIENE NINGUNA VALIDEZ FISCAL
          `,
          style: 'disclaimer',
          alignment: 'center'
        },
      ],
      footer: {
        columns: [
         
        ]
      },
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        },
        sectionHeaderMargin: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]   
        },
        disclaimer: {
          bold: false,
          fontSize: 6,
          margin: [0, 60,0, 15],
          color: '#9a9a9a' 
        },
        disclaimer2: {
          bold: false,
          fontSize: 6,
          margin: [0, 0,0, 15],
          color: '#838383' 
        }
      },
    };

    pdfMake.createPdf(docDefinition).print();
  }

  generateOrderService(data) {
    const itemsWithObservations = data?.items?.filter(item => item?.observations?.length > 0);
    const heights = [...data?.items.map(item => 25)];
    let docDefinition = {
      content: [
        {
          image: DICOPRINT_LOGO,
          fit: [100, 100],
        },
        {
          text: 'DICOPRINT',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'ORDEN DE PRODUCCION',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'red'
        },
        {
          text: 'Detalle de cliente',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: `Nombre: ${data?.client?.name}`,
                bold:true
              },
              {
                text: `Telefono: ${data?.client?.address?.phone}`,
                bold:true
              },
            /*   { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo } */
            ],
            [
              {
                text: `Fecha: ${new Date(data?.noteDate).toLocaleString('es-MX')}`,
                alignment: 'right'
              },
              { 
                text: `Id venta : ${data?._id}`,
                alignment: 'right'
              },
              { 
                text: `Fecha de entrega : ${data?.items[0] && data?.items[0].deliveryDate ? new Date(data?.items[0].deliveryDate).toLocaleString('es-MX'): ''}`,
                alignment: 'right'
              },
              { 
                text: `Hora de entrega : ${data?.items[0] && data?.items[0].deliveryTime ? data?.items[0].deliveryTime : ''}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Detalle de orden',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*'],
            heights: [20, ...heights, 35, 35, 35],
            body: [
              ['Cantidad', 'Descripcion'],
              ...data?.items.map(p => ([p.quantity, p.fileName]))
            ]
          }
        },
        {
          text: 'Observaciones',
          style: 'sectionHeader'
        },
        {
          ul: [...itemsWithObservations.map(item => `${item.fileName} - ${item.observations}`)],
          margin: [0, 0 ,0, 15]
        },
        /* {
          columns: [
            [{ qr: `${this.invoice.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        }, */
        {
          text: 'Instrucciones adicionales',
          style: 'sectionHeaderMargin'
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        },
        sectionHeaderMargin: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]   
        }
      }
    };

    pdfMake.createPdf(docDefinition).print();
  }

  getItemSubTotal(item): number {
    let sum = 0;
    if(!item.isPrintingItem) {
      sum += item.unitPrice * item.quantity;
    } else {
      sum += item.unitTotalPrice * item.quantity;
    }
    return sum;
  }

  getTotalItemSum(data): number {
    let sum = 0;
    for(const item of data?.items) {
      if(!item.isPrintingItem) {
        sum += item.unitPrice * item.quantity;
      } else {
        sum += item.unitTotalPrice * item.quantity;
      }
    }
    return sum;
  }
}
