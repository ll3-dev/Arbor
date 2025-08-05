#!/bin/bash

# =================================================================
# Gemini를 이용한 Git 커밋 자동 생성 스크립트
# =================================================================

echo "🔄 1. 모든 변경 사항을 스테이징합니다 (git add .)..."
git add .

echo "🤖 2. git diff 내용을 추출합니다..."
git diff --cached > .gemini/git_diff.tmp
if [ ! -s .gemini/git_diff.tmp ]; then
    echo "⚠️ 변경 사항이 없습니다. 커밋할 내용이 없습니다."
    rm .gemini/git_diff.tmp
    exit 1
fi

echo "✨ 3. Gemini를 호출하여 커밋 메시지를 생성합니다... (시간이 걸릴 수 있습니다)"
if [ ! -f prompts/commit_prompt.md ]; then
    echo "❌ 'commit_prompt.txt' 파일을 찾을 수 없습니다. 스크립트와 같은 위치에 생성해주세요."
    rm .gemini/git_diff.tmp
    exit 1
fi
cat prompts/commit_prompt.md .gemini/git_diff.tmp | gemini a > .gemini/commit_message.tmp

echo "📝 4. 생성된 커밋 메시지를 정리합니다..."
# 불필요한 'Loaded...' 라인을 제거하고, 혹시 모를 앞뒤 공백을 제거
COMMIT_MSG=$(cat .gemini/commit_message.tmp | grep -v "Loaded cached credentials." | sed -e 's/^[ \t]*//' -e 's/[ \t]*$//')

if [ -z "$COMMIT_MSG" ]; then
    echo "❌ Gemini가 커밋 메시지를 생성하지 못했거나, 스크립트가 내용을 추출하지 못했습니다."
    # 디버깅을 위해 임시 파일들을 남겨둠
    exit 1
fi

echo "🚀 5. 생성된 메시지로 git commit을 실행합니다..."
# 생성된 메시지를 사용하여 커밋 실행
git commit -m "$COMMIT_MSG"

# 성공적으로 완료 후 임시 파일 삭제
echo "✅ 작업 완료! 임시 파일들을 정리합니다."
rm .gemini/git_diff.tmp .gemini/commit_message.tmp

echo "🎉 커밋이 성공적으로 완료되었습니다!"
