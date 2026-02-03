import sys
import os
import pdfplumber
import pandas as pd

def convert_pdf_to_excel(pdf_file, excel_file):
    try:
        with pdfplumber.open(pdf_file) as pdf:
            all_tables = []
            for page in pdf.pages:
                tables = page.extract_tables()
                for table in tables:
                    if table:
                        df = pd.DataFrame(table)
                        all_tables.append(df)

            if all_tables:
                with pd.ExcelWriter(excel_file) as writer:
                    for i, df in enumerate(all_tables):
                        df.to_excel(writer, sheet_name=f'Table_{i+1}', index=False, header=False)
                print(f"Successfully converted {pdf_file} to {excel_file}")
            else:
                # If no tables, try to extract all text into one sheet
                text = ""
                for page in pdf.pages:
                    text += page.extract_text() or ""

                df = pd.DataFrame([line.split() for line in text.split('\n')])
                df.to_excel(excel_file, index=False, header=False)
                print(f"Successfully converted {pdf_file} to {excel_file} (Text mode)")
    except Exception as e:
        print(f"Error during conversion: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python pdf_to_excel.py input.pdf output.xlsx")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_excel = sys.argv[2]
    convert_pdf_to_excel(input_pdf, output_excel)
