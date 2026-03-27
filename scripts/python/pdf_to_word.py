import sys
import os
from pdf2docx import Converter

def convert_pdf_to_word(pdf_file, word_file):
    try:
        cv = Converter(pdf_file)
        cv.convert(word_file, start=0, end=None)
        cv.close()
        print(f"Successfully converted {pdf_file} to {word_file}")
    except Exception as e:
        print(f"Error during conversion: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python pdf_to_word.py input.pdf output.docx")
        sys.exit(1)

    input_pdf = sys.argv[1]
    output_word = sys.argv[2]
    convert_pdf_to_word(input_pdf, output_word)
