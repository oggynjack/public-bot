from playwright.sync_api import sync_playwright
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    pages = [
        "dashboard",
        "plans",
        "music",
        "setup",
        "bot",
        "profile",
        "subscription",
        "docs"
    ]

    for p in pages:
        # Construct the file path to the HTML file
        # This assumes that the Next.js build process outputs HTML files
        # in the `out` directory. This might need to be adjusted.
        file_path = os.path.abspath(f"dashboard/next-app/out/{p}.html")

        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            # Create a placeholder file to avoid crashing the script
            with open(file_path, "w") as f:
                f.write(f"<h1>{p} page not found</h1>")

        page.goto(f"file://{file_path}")
        page.screenshot(path=f"jules-scratch/verification/{p}.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
