import os
import fnmatch
import argparse
import json
from datetime import datetime

def load_gitignore_items(project_root):
    gitignore_path = os.path.join(project_root, ".gitignore")
    if not os.path.exists(gitignore_path):
        return []

    with open(gitignore_path, "r") as gitignore_file:
        gitignore_items = gitignore_file.read().splitlines()

    return gitignore_items

def is_excluded(item, gitignore_items):
    for pattern in gitignore_items:
        if fnmatch.fnmatch(item, pattern) or item.startswith(".") or item.startswith("__"):
            return True
    return False

def print_directory_contents_tree(path, output_file, gitignore_items, include_files, include_extensions, add_date_modified, indent="", first_item=True):
    for item in os.listdir(path):
        if is_excluded(item, gitignore_items):
            continue

        item_path = os.path.join(path, item)
        modified_time = datetime.fromtimestamp(os.path.getmtime(item_path)).strftime('%Y-%m-%d %H:%M:%S')

        if os.path.isdir(item_path):
            if first_item:
                output_file.write(indent + "├── " + item + "\n")
                first_item = False
            else:
                output_file.write(indent + "│\n" + indent + "├── " + item + "\n")
            print_directory_contents_tree(item_path, output_file, gitignore_items, include_files, include_extensions, add_date_modified, indent + "│   ", first_item)
        elif include_files:
            file_name = item
            if not include_extensions:
                file_name, _ = os.path.splitext(file_name)
            if add_date_modified:
                file_name += " - " + modified_time
            if first_item:
                output_file.write(indent + "├── " + file_name + "\n")
                first_item = False
            else:
                output_file.write(indent + "│\n" + indent + "├── " + file_name + "\n")

def print_directory_contents_table(path, output_file, gitignore_items, include_files, include_extensions, add_date_modified):
    output_file.write("| Name | Type | Date Modified |\n")
    output_file.write("|------|------|---------------|\n")
    for item in os.listdir(path):
        if is_excluded(item, gitignore_items):
            continue

        item_path = os.path.join(path, item)
        modified_time = datetime.fromtimestamp(os.path.getmtime(item_path)).strftime('%Y-%m-%d %H:%M:%S')

        if os.path.isdir(item_path):
            output_file.write(f"| {item} | Directory | {modified_time if add_date_modified else ''} |\n")
            print_directory_contents_table(item_path, output_file, gitignore_items, include_files, include_extensions, add_date_modified)
        elif include_files:
            file_name = item
            if not include_extensions:
                file_name, _ = os.path.splitext(file_name)
            output_file.write(f"| {file_name} | File | {modified_time if add_date_modified else ''} |\n")

def print_directory_contents_text(path, output_file, gitignore_items, include_files, include_extensions, add_date_modified, indent=""):
    for item in os.listdir(path):
        if is_excluded(item, gitignore_items):
            continue
        item_path = os.path.join(path, item)
        modified_time = datetime.fromtimestamp(os.path.getmtime(item_path)).strftime('%Y-%m-%d %H:%M:%S')

        if os.path.isdir(item_path):
            output_file.write(indent + item + "/ - " + (modified_time if add_date_modified else '') + "\n")
            print_directory_contents_text(item_path, output_file, gitignore_items, include_files, include_extensions, add_date_modified, indent + "  ")
        elif include_files:
            file_name = item
            if not include_extensions:
                file_name, _ = os.path.splitext(file_name)
            output_file.write(indent + file_name + " - " + (modified_time if add_date_modified else '') + "\n")

def get_user_input():
    markdown_style = input("Markdown Visual Style?\n1. Tree\n2. Table\n3. Text\n")
    include_files = input("Include Files? (yes/no)\n").lower() == "yes"
    include_extensions = input("Include File Extensions? (yes/no)\n").lower() == "yes"
    add_date_modified = input("Add Date Modified? (yes/no)\n").lower() == "yes"
    include_root_folder = input("Include Root Folder? (yes/no)\n").lower() == "yes"
    return {
        'markdown_style': markdown_style,
        'include_files': include_files,
        'include_extensions': include_extensions,
        'add_date_modified': add_date_modified,
        'include_root_folder': include_root_folder
    }

def save_settings(settings, output_file):
    with open(output_file, 'w') as f:
        json.dump(settings, f)

def load_settings(output_file):
    try:
        with open(output_file, 'r') as f:
            content = f.read()
            if content:
                return json.loads(content)
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    return None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate directory structure')
    parser.add_argument('--skip-messages', action='store_true', help='Skip messages and use last settings')
    parser.add_argument('--style', type=int, choices=[1, 2, 3], help='Prefill the visual style (1: Tree, 2: Table, 3: Text)')
    args = parser.parse_args()
    project_root = os.path.dirname(os.path.realpath(__file__))
    output_file_name = "directory_structure.md"
    gitignore_items = load_gitignore_items(project_root)

    last_settings = load_settings(output_file_name)
    if args.skip_messages and last_settings:
        settings = last_settings
    else:
        settings = get_user_input()
        if args.style:
            settings['markdown_style'] = str(args.style)
        save_settings(settings, output_file_name)

    with open(output_file_name, "w") as output_file:
        if settings['include_root_folder']:
            output_file.write(project_root + "\n")
        if settings['markdown_style'] == "1":
            print_directory_contents_tree(project_root, output_file, gitignore_items, settings['include_files'], settings['include_extensions'], settings['add_date_modified'])
        elif settings['markdown_style'] == "2":
            print_directory_contents_table(project_root, output_file, gitignore_items, settings['include_files'], settings['include_extensions'], settings['add_date_modified'])
        elif settings['markdown_style'] == "3":
            print_directory_contents_text(project_root, output_file, gitignore_items, settings['include_files'], settings['include_extensions'], settings['add_date_modified'])
