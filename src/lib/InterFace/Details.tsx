import { FC } from 'react';
import style from './style.module.css';
import { useFormState } from 'react-final-form';
import { CalculationResultType } from './helper';
import Flex from '@/components/Flex';
import { Button } from '@nextui-org/button';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const Details: FC<{ totalCalculatedData?: CalculationResultType | null }> = (
  props
) => {
  const { values } = useFormState();
  const { totalCalculatedData: data } = props;

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add logo (Base64 or URL)
    const logoUrl =
      'https://thumbs.dreamstime.com/b/ocean-logo-design-abstract-waves-seagulls-89336091.jpg'; // Replace with your logo URL or Base64 string
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Position logo at (x, y), with width and height

    // Add title in the center
    doc.setFontSize(18);
    doc.text('Report Title', pageWidth / 2, 20, { align: 'center' });

    // Add date on the right
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(currentDate, pageWidth - 10, 20, { align: 'right' });

    // Add report data in the center with lines
    let y = 50; // Starting y position after the header
    Object.entries(data ?? []).forEach(([name, value]) => {
      doc.setFontSize(14);

      // Check if value is an array (e.g., expenses)
      if (Array.isArray(value)) {
        // Handle array value (e.g., expenses)
        value.forEach((expense, index) => {
          if (typeof expense === 'object' && expense !== null) {
            const expenseStr = `Expense ${index + 1}: ${expense.name} - ${
              expense.amount
            }`;
            doc.text(expenseStr, pageWidth / 2, y, { align: 'center' });
            y += 15; // Move down after each expense
          }
        });
      } else {
        // Handle simple string or number values
        doc.text(`${name}: ${value}`, pageWidth / 2, y, { align: 'center' });
        y += 15; // Move down for the next entry
      }

      // Draw a line under each entry
      doc.line(10, y + 5, pageWidth - 10, y + 5); // Horizontal line
      y += 15; // Move down further for the next entry
    });

    // Save the generated PDF
    doc.save('styled_report.pdf');
  };

  const downloadExcel = () => {
    // Create the worksheet data from the object
    const worksheetData = [
      {
        Name: data?.name,
        'Total Price': data?.totalPrice,
        'Total Price/Kilo': data?.totalPriceKilo,
        'Fisher Rate': data?.fisherRate,
        'Total Expenses': data?.totalExpenses,
        'Boat Rate': data?.boatRate,
        'Representative Rate': data?.representativeRate,
        'All Shared': data?.allShared,
        Shared: data?.shared,
        'Real Boat Rate': data?.realBoatRate,
        'Owner Boat Rate': data?.ownerBoatRate,
        'Total Owner Rate': data?.totalOwnerRate,
        'All Fisher Rate': data?.allFisherRate,
        'Other Rate': data?.otherRate,
        Kilo: data?.kilo,
        'Price per Kilo': data?.priceKilo,
        Expenses: data?.expenses
          .map((expense) => `${expense.name}: ${expense.amount}`)
          .join(', ') // Convert expenses to a single string
      }
    ];

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Calculation Report');

    // Trigger download
    XLSX.writeFile(workbook, 'calculation_report.xlsx');
  };

  if (!data) return null;
  return (
    <>
      <div
        style={{
          width: 400,
          padding: 20,
          borderRadius: 10
          // boxShadow: ' 0 4px 6px rgba(0, 0, 0, 0.1)',
          // backgroundColor: '#fff'
        }}
      >
        <h1>التفاصيل</h1>
        <div className={style.detail}>
          <strong>رقم الرحلة</strong> {data.name}
        </div>
        <div className={style.detail}>
          <strong>الوزن الصافي:</strong> {data.kilo}
        </div>
        <div className={style.detail}>
          <strong>سعر الكيلو:</strong> {data.priceKilo}
        </div>

        <div className={style.detail}>
          <strong>اجمالي المبلغ الكلي:</strong> {data.totalPriceKilo}
        </div>
        <div className={style.detail}>
          <strong>ضريبة الجمعية:</strong> {data.fisherRate}
        </div>
        <div className={style.detail}>
          <strong>السركال</strong>
          <ul>
            {/* {data.expenses?.map((expense) => <li>{expense}</li>)} */}
            {data?.expenses?.map((expense, index) => {
              const valueK = Object.keys(expense)[0]; // Extract the value from the object
              const valueKey = Object.values(expense)[0]; // Extract the value from the object

              return (
                <li key={index}>
                  {values[valueK]}: {valueKey}
                </li>
              );
            })}
          </ul>
          <strong>المبلغ الاجمالي للسركال:</strong> {data.totalExpenses}
        </div>
        <div className={style.detail}>
          <strong>نسبة العبري:</strong> {data.boatRate}
        </div>
        <div className={style.detail}>
          <strong>اجمالي نسبة العبري:</strong> {data.realBoatRate}
        </div>
        <div className={style.detail}>
          <strong>حصة المالك من العبري:</strong> {data.ownerBoatRate}
        </div>
        <div className={style.detail}>
          <strong>حصة الوكيل:</strong> {data.representativeRate}
        </div>
        <div className={style.detail}>
          <strong>مجموع الاسهم :</strong> {data.allShared}
        </div>
        <div className={style.detail}>
          <strong>قيمة السهم الواحد :</strong> {data.shared}
        </div>
        <div className={style.detail}>
          <strong>اسهم المالك:</strong> {values.owner_shared}
        </div>
        <div className={style.detail}>
          <strong>اسهم البحارة:</strong> {values.fisher_shared}
        </div>
        {values?.other_shared && (
          <div className={style.detail}>
            <strong>اسهم اخرى:</strong>
            {values.other_shared}
          </div>
        )}

        <div className={style.detail}>
          <strong>المبلغ الاجمالي للبحارة:</strong> {data.allFisherRate}
        </div>
        <div className={style.detail}>
          <strong>المبلغ الاجمالي للمالك:</strong> {data.totalOwnerRate}
        </div>
        {values?.other_shared && (
          <div className={style.detail}>
            <strong>اجمالي اخرى:</strong> {data?.otherRate}
          </div>
        )}
        <Flex>
          <Button>save</Button>
          <Button onClick={downloadPDF}>save and download as PDF</Button>
          <Button onClick={downloadExcel}>save and download as EXCEL</Button>
        </Flex>
      </div>
    </>
  );
};

export default Details;
