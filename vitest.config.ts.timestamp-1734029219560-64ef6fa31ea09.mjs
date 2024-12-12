// vitest.config.ts
import { resolve } from "path";
import vue from "file:///workspaces/vue3-carousel/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@6.0.3_@types+node@22.10.2_terser@5.37.0__vue@3.5.13_typescript@5.7.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///workspaces/vue3-carousel/node_modules/.pnpm/vitest@2.1.8_@types+node@22.10.2_jsdom@25.0.1_terser@5.37.0/node_modules/vitest/dist/config.js";

// tsconfig.json
var compilerOptions = {
  target: "es6",
  moduleResolution: "node",
  strict: true,
  importHelpers: true,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  noImplicitThis: false,
  declaration: true,
  baseUrl: ".",
  outDir: "./dist",
  lib: ["esnext", "dom", "dom.iterable", "scripthost"],
  paths: {
    "@/*": ["src/*"],
    "rollup/parseAst": ["./node_modules/rollup/dist/parseAst"]
  }
};

// vitest.config.ts
var __vite_injected_original_dirname = "/workspaces/vue3-carousel";
var resolvePaths = () => {
  return Object.fromEntries(
    Object.entries(compilerOptions.paths || {}).map(([key, value]) => [
      key.replace("/*", ""),
      resolve(__vite_injected_original_dirname, value[0].replace("/*", "/"))
    ])
  );
};
var vitest_config_default = defineConfig({
  plugins: [vue()],
  test: {
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom",
    globals: true,
    reporters: ["basic"],
    include: ["**/*.spec.{ts,tsx,js,jsx}"],
    outputFile: {
      junit: "./junit-report.xml"
    },
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "text-summary"],
      include: ["src/**/*.ts"],
      exclude: ["*.spec.ts"]
    },
    alias: resolvePaths()
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJ0c2NvbmZpZy5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3dvcmtzcGFjZXMvdnVlMy1jYXJvdXNlbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3dvcmtzcGFjZXMvdnVlMy1jYXJvdXNlbC92aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL3Z1ZTMtY2Fyb3VzZWwvdml0ZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnXG5cbmltcG9ydCB7IGNvbXBpbGVyT3B0aW9ucyB9IGZyb20gJy4vdHNjb25maWcuanNvbidcblxuY29uc3QgcmVzb2x2ZVBhdGhzID0gKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgIE9iamVjdC5lbnRyaWVzKGNvbXBpbGVyT3B0aW9ucy5wYXRocyB8fCB7fSkubWFwKChba2V5LCB2YWx1ZV0pID0+IFtcbiAgICAgIGtleS5yZXBsYWNlKCcvKicsICcnKSxcbiAgICAgIHJlc29sdmUoX19kaXJuYW1lLCB2YWx1ZVswXS5yZXBsYWNlKCcvKicsICcvJykpLFxuICAgIF0pXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgdGVzdDoge1xuICAgIHNldHVwRmlsZXM6ICcuL3ZpdGVzdC5zZXR1cC50cycsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICByZXBvcnRlcnM6IFsnYmFzaWMnXSxcbiAgICBpbmNsdWRlOiBbJyoqLyouc3BlYy57dHMsdHN4LGpzLGpzeH0nXSxcbiAgICBvdXRwdXRGaWxlOiB7XG4gICAgICBqdW5pdDogJy4vanVuaXQtcmVwb3J0LnhtbCcsXG4gICAgfSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICd2OCcsXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiAnY292ZXJhZ2UnLFxuICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICd0ZXh0LXN1bW1hcnknXSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudHMnXSxcbiAgICAgIGV4Y2x1ZGU6IFsnKi5zcGVjLnRzJ11cbiAgICB9LFxuICAgIGFsaWFzOiByZXNvbHZlUGF0aHMoKSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGV4dGVuc2lvbnM6IFsnLnRzJywgJy50c3gnLCAnLmpzJywgJy5qc29uJ10sXG4gIH0sXG59KVxuIiwgIntcbiAgXCJjb21waWxlck9wdGlvbnNcIjoge1xuICAgIFwidGFyZ2V0XCI6IFwiZXM2XCIsXG4gICAgXCJtb2R1bGVSZXNvbHV0aW9uXCI6IFwibm9kZVwiLFxuICAgIFwic3RyaWN0XCI6IHRydWUsXG4gICAgXCJpbXBvcnRIZWxwZXJzXCI6IHRydWUsXG4gICAgXCJlc01vZHVsZUludGVyb3BcIjogdHJ1ZSxcbiAgICBcImFsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHNcIjogdHJ1ZSxcbiAgICBcIm5vSW1wbGljaXRUaGlzXCI6IGZhbHNlLFxuICAgIFwiZGVjbGFyYXRpb25cIjogdHJ1ZSxcbiAgICBcImJhc2VVcmxcIjogXCIuXCIsXG4gICAgXCJvdXREaXJcIjogXCIuL2Rpc3RcIixcbiAgICBcImxpYlwiOiBbXCJlc25leHRcIiwgXCJkb21cIiwgXCJkb20uaXRlcmFibGVcIiwgXCJzY3JpcHRob3N0XCJdLFxuICAgIFwicGF0aHNcIjoge1xuICAgICAgXCJALypcIjogW1wic3JjLypcIl0sXG4gICAgICBcInJvbGx1cC9wYXJzZUFzdFwiOiBbXCIuL25vZGVfbW9kdWxlcy9yb2xsdXAvZGlzdC9wYXJzZUFzdFwiXVxuICAgIH1cbiAgfSxcbiAgXCJpbmNsdWRlXCI6IFtcInNyY1wiXSxcbiAgXCJleGNsdWRlXCI6IFtcIm5vZGVfbW9kdWxlc1wiXVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUSxTQUFTLGVBQWU7QUFFelIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9COzs7QUNGM0Isc0JBQW1CO0FBQUEsRUFDakIsUUFBVTtBQUFBLEVBQ1Ysa0JBQW9CO0FBQUEsRUFDcEIsUUFBVTtBQUFBLEVBQ1YsZUFBaUI7QUFBQSxFQUNqQixpQkFBbUI7QUFBQSxFQUNuQiw4QkFBZ0M7QUFBQSxFQUNoQyxnQkFBa0I7QUFBQSxFQUNsQixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxRQUFVO0FBQUEsRUFDVixLQUFPLENBQUMsVUFBVSxPQUFPLGdCQUFnQixZQUFZO0FBQUEsRUFDckQsT0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDLE9BQU87QUFBQSxJQUNmLG1CQUFtQixDQUFDLHFDQUFxQztBQUFBLEVBQzNEO0FBQ0Y7OztBRGpCRixJQUFNLG1DQUFtQztBQU96QyxJQUFNLGVBQWUsTUFBTTtBQUN6QixTQUFPLE9BQU87QUFBQSxJQUNaLE9BQU8sUUFBUSxnQkFBZ0IsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTTtBQUFBLE1BQ2hFLElBQUksUUFBUSxNQUFNLEVBQUU7QUFBQSxNQUNwQixRQUFRLGtDQUFXLE1BQU0sQ0FBQyxFQUFFLFFBQVEsTUFBTSxHQUFHLENBQUM7QUFBQSxJQUNoRCxDQUFDO0FBQUEsRUFDSDtBQUNGO0FBRUEsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsTUFBTTtBQUFBLElBQ0osWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsV0FBVyxDQUFDLE9BQU87QUFBQSxJQUNuQixTQUFTLENBQUMsMkJBQTJCO0FBQUEsSUFDckMsWUFBWTtBQUFBLE1BQ1YsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLGtCQUFrQjtBQUFBLE1BQ2xCLFVBQVUsQ0FBQyxRQUFRLGNBQWM7QUFBQSxNQUNqQyxTQUFTLENBQUMsYUFBYTtBQUFBLE1BQ3ZCLFNBQVMsQ0FBQyxXQUFXO0FBQUEsSUFDdkI7QUFBQSxJQUNBLE9BQU8sYUFBYTtBQUFBLEVBQ3RCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sT0FBTztBQUFBLEVBQzVDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
