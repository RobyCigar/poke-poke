#!/bin/bash

# Script to install git hooks: Version Bump + Build React + Build Golang before commit

echo "🔧 Installing Git hooks..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

mkdir -p .git/hooks

# ========================================
# PRE-COMMIT HOOK (Version Increment + React Build + Golang Build)
# ========================================
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# --- 1. Simple version increment hook ---
increment_patch_version() {
    local version=$1
    local major=$(echo $version | cut -d. -f1)
    local minor=$(echo $version | cut -d. -f2)
    local patch=$(echo $version | cut -d. -f3)
    patch=$((patch + 1))
    echo "$major.$minor.$patch"
}

# Version Increment
if [ -f "package.json" ]; then
    current_version=$(node -p "require('./package.json').version" 2>/dev/null || echo "0.0.0")
    new_version=$(increment_patch_version $current_version)
    npm version $new_version --no-git-tag-version
    git add package.json
    echo "📦 Version updated: $current_version → $new_version"

elif [ -f "version.txt" ]; then
    current_version=$(cat version.txt)
    new_version=$(increment_patch_version $current_version)
    echo $new_version > version.txt
    git add version.txt
    echo "📄 Version updated: $current_version → $new_version"

else
    echo "0.0.1" > version.txt
    git add version.txt
    echo "✅ Created version.txt with initial version 0.0.1"
fi

# --- 2. Build React Frontend ( menggunakan /dist ) ---
echo ""
echo "📦 Building React frontend (npm run build)..."

if [ -f "package.json" ]; then
    if npm run build; then
        echo "✅ React frontend build successful!"
        # Add the main build directory to the commit
        if [ -d "dist" ]; then
            git add dist
            echo "➕ Added 'dist/' directory to commit."
        fi

        # Check for admin frontend
        if cd admin; then
            if npm run build; then
                echo "✅ React admin build successful!"
                if [ -d "dist" ]; then
                    git add dist
                    echo "➕ Added 'admin/dist/' directory to commit."
                fi
            else
                echo "❌ React admin build failed! Commit aborted."
                exit 1
            fi
            cd ..
        else
            echo "⚠️  admin/ directory not found, skipping React admin build"
        fi
    else
        echo "❌ React build failed! Commit aborted."
        exit 1
    fi
else
    echo "⚠️  package.json not found, skipping React build"
fi

# --- 3. Build Golang Backend ---
echo ""
echo "🔨 Building Golang backend..."

if [ -d "backend" ]; then
    ORIGINAL_DIR=$(pwd)
    cd backend

    if [ -f "Makefile" ]; then
        if make build-linux; then
            echo "✅ Golang build successful!"
            # GANTI 'malabarapp' DENGAN NAMA BINARY YANG DIHASILKAN
            # Contoh: jika outputnya 'app-linux', ganti 'malabarapp'
            BINARY_NAME="malabarapp" 
            if [ -f "$BINARY_NAME" ]; then
                git add "$BINARY_NAME"
                echo "➕ Added Golang binary '$BINARY_NAME' to commit."
            else
                echo "⚠️ Golang binary '$BINARY_NAME' not found to stage. Check Makefile output."
            fi
        else
            echo "❌ Golang build failed! Commit aborted."
            cd "$ORIGINAL_DIR"
            exit 1
        fi
    else
        echo "⚠️  Makefile not found, skipping Golang build"
    fi

    cd "$ORIGINAL_DIR"
else
    echo "⚠️ backend/ directory not found, skipping Golang build"
fi

echo ""
echo "🎉 Pre-commit checks passed! Proceeding with commit..."
exit 0
EOF

# ========================================
# PRE-PUSH HOOK (Empty)
# ========================================
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

echo "🚀 Running pre-push checks... (None required as all builds are pre-commit)"
exit 0
EOF

# Make executable
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push

echo ""
echo "✅ Git hooks installed successfully!"
echo "📋 Installed:"
echo "   • pre-commit → Auto version bump + React build (menggunakan /dist) + Golang build."
echo "   • pre-push   → (Empty)"