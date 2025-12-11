import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
	plugins: [viteSingleFile()],
	build: {
		// 중요: 모든 에셋(이미지, 폰트 등)을 base64로 인라인화 하기 위한 임계값 설정
		// 기본값은 4096(4kb)이나, 이를 100MB 등으로 아주 크게 잡아서 강제 인라인 시킵니다.
		assetsInlineLimit: 100000000, 
		
		// CSS 코드 분할을 끄고 하나로 합칩니다.
		cssCodeSplit: false,
		
		// 1.5MB 코드는 꽤 크므로 압축을 빡빡하게 합니다.
		minify: 'terser', 
		terserOptions: {
			compress: {
				drop_console: true, // 프로덕션 배포용이므로 콘솔 로그 제거
				drop_debugger: true
			}
		},
        // 빌드 결과물이 나올 경로
        outDir: "dist" 
	},
})