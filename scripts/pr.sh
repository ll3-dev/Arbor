#!/bin/bash

# =================================================================
# Gemini와 gh-cli를 이용한 GitHub PR 자동 생성 스크립트
# =================================================================

echo "🤖 1. git diff 내용을 추출합니다..."
# 현재 스테이징된 변경사항을 임시 파일에 저장
git diff --cached > .gemini/git_diff.tmp
if [ ! -s .gemini/git_diff.tmp ]; then
    echo "⚠️ 스테이징된 변경 사항이 없습니다. 'git add'를 먼저 실행해주세요."
    rm git_diff.tmp
    exit 1
fi

echo "✨ 2. Gemini를 호출하여 PR 내용을 생성합니다... (시간이 걸릴 수 있습니다)"
# 프롬프트와 diff 내용을 합쳐 Gemini에 전달하고, 결과를 임시 파일에 저장
# pr_prompt.txt 파일이 없으면 에러 메시지 출력
if [ ! -f prompts/pr_prompt.md ]; then
    echo "❌ 'pr_prompt.txt' 파일을 찾을 수 없습니다. 스크립트와 같은 위치에 생성해주세요."
    rm git_diff.tmp
    exit 1
fi
cat prompts/pr_prompt.md .gemini/git_diff.tmp | gemini a > .gemini/pr_content.tmp

echo "📝 3. 생성된 내용에서 제목과 본문을 분리합니다..."
# Gemini가 생성한 내용에서 [TITLE]과 [BODY]를 파싱
PR_TITLE=$(cat .gemini/pr_content.tmp | tr -d '\r' | grep '\[TITLE\]' | sed 's/\[TITLE\] //')
PR_BODY=$(cat .gemini/pr_content.tmp | tr -d '\r' | sed '1,/\[BODY\]/d')

# 제목이나 본문이 비어있으면 에러 처리
if [ -z "$PR_TITLE" ] || [ -z "$PR_BODY" ]; then
    echo "TITLE: $PR_TITLE"
    echo "BODY: $PR_BODY"
    echo "❌ Gemini가 PR 제목 또는 본문을 생성하지 못했습니다. pr_content.tmp 파일을 확인해주세요."
    rm .gemini/git_diff.tmp
    # pr_content.tmp는 디버깅을 위해 남겨둠
    exit 1
fi

echo "🚀 4. GitHub CLI를 사용하여 PR을 생성하고 웹에서 엽니다..."
# gh-cli로 PR 생성. -w 옵션은 생성 후 바로 웹 브라우저에서 해당 PR을 열어줌
gh pr create --title "$PR_TITLE" --body "$PR_BODY" -w

# 성공적으로 완료 후 임시 파일 삭제
echo "✅ 작업 완료! 임시 파일들을 정리합니다."
rm .gemini/git_diff.tmp .gemini/pr_content.tmp

echo "🎉 PR이 웹 브라우저에서 열렸습니다. 최종 확인 후 Merge 하세요!"
