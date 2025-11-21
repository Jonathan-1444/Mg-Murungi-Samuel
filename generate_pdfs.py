from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os
import json

BASE_DIR = os.path.dirname(__file__)
DL_DIR = os.path.join(BASE_DIR, 'downloads')
if not os.path.exists(DL_DIR):
    os.makedirs(DL_DIR)

files = [
    ('Master_Guide_and_Senior_Youth_Manuals.pdf', 'Master Guide & Senior Youth Manuals', 'Comprehensive manuals covering Master Guide training curriculum, investiture requirements, and leadership guidance for senior youth leaders.'),
    ('Pathfinder_Leadership_Training_Guides.pdf', 'Pathfinder Leadership Training Guides', 'Step-by-step training guides for Pathfinder leaders, including session plans, activities and assessment checklists.'),
    ('Sermon_and_Devotion_Outlines_for_Youth_Programs.pdf', 'Sermon & Devotion Outlines', 'A collection of short sermon outlines and devotional sequences tailored for youth meetings and weekly programs.'),
    ('AY_Week_of_Prayer_and_Induction_Resources.pdf', 'AY Week of Prayer & Induction Resources', 'Program guides and study materials for AY week of prayer events and induction ceremonies.'),
    ('Leadership_PowerPoint_Presentations.pdf', 'Leadership PowerPoint Presentations', 'Slide decks for leadership trainings, converted to simple PDF slides for quick reference.'),
    ('Personal_Development_Worksheets.pdf', 'Personal Development Worksheets', 'Printable worksheets for goal setting, personal reflection and skills tracking to help youth develop leadership and life skills.'),
]

metadata = {}

for fname, title, desc in files:
    path = os.path.join(DL_DIR, fname)
    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4
    c.setFont('Helvetica-Bold', 18)
    c.drawString(60, height - 80, title)
    c.setFont('Helvetica', 12)
    text = c.beginText(60, height - 110)
    for line in desc.split('.'):
        line = line.strip()
        if not line:
            continue
        text.textLine(line + '.')
    c.drawText(text)
    c.setFont('Helvetica-Oblique', 10)
    c.drawString(60, 60, 'Generated placeholder PDF — replace with full resource when available.')
    c.showPage()
    c.save()

    size_bytes = os.path.getsize(path)
    metadata[fname] = {
        'path': os.path.relpath(path, BASE_DIR).replace('\\', '/'),
        'size_bytes': size_bytes,
        'size_kb': round(size_bytes / 1024, 1),
        'type': 'application/pdf'
    }

# write metadata
meta_path = os.path.join(DL_DIR, 'metadata.json')
with open(meta_path, 'w', encoding='utf-8') as f:
    json.dump(metadata, f, indent=2)

print('Generated', len(files), 'PDFs in', DL_DIR)
print('Metadata written to', meta_path)
