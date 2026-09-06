var TurboHomepageShowcase = (function(exports) {
	Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
	//#endregion
	//#region packages/core/dist/tokens/index.js
	var tokens = {
		$schema: "https://design-tokens.org/schema.json",
		$description: "Turbo Themes - Flat tokens for 43 themes",
		$version: "0.42.6",
		$generated: "250f6c933d2719182e178a360bd03d8795c59127db5882659c235c2f353a45a4",
		meta: {
			"themeIds": [
				"ayu-dark",
				"ayu-light",
				"ayu-mirage",
				"bulma-dark",
				"bulma-light",
				"catppuccin-frappe",
				"catppuccin-latte",
				"catppuccin-macchiato",
				"catppuccin-mocha",
				"dracula",
				"everforest-dark-hard",
				"everforest-dark-soft",
				"everforest-dark",
				"everforest-light-hard",
				"everforest-light-soft",
				"everforest-light",
				"github-dark",
				"github-light",
				"gruvbox-dark-hard",
				"gruvbox-dark-soft",
				"gruvbox-dark",
				"gruvbox-light-hard",
				"gruvbox-light-soft",
				"gruvbox-light",
				"kanagawa-dragon",
				"kanagawa-lotus",
				"kanagawa-wave",
				"nord",
				"one-dark",
				"one-light",
				"radix-mauve-dark",
				"radix-mauve-light",
				"radix-slate-dark",
				"radix-slate-light",
				"rose-pine-dawn",
				"rose-pine-moon",
				"rose-pine",
				"solarized-dark",
				"solarized-light",
				"terminal",
				"tokyo-night-dark",
				"tokyo-night-light",
				"tokyo-night-storm"
			],
			"totalThemes": 43
		},
		shared: {
			"spacing": {
				"xs": "0.25rem",
				"sm": "0.5rem",
				"md": "1rem",
				"lg": "1.5rem",
				"xl": "2rem"
			},
			"elevation": {
				"none": "none",
				"sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
				"md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				"lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
				"xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
			},
			"animation": {
				"durationFast": "150ms",
				"durationNormal": "300ms",
				"durationSlow": "500ms",
				"easingDefault": "cubic-bezier(0.4, 0, 0.2, 1)",
				"easingEmphasized": "cubic-bezier(0.05, 0.7, 0.1, 1)"
			},
			"opacity": {
				"disabled": .5,
				"hover": .8,
				"pressed": .6
			}
		},
		themes: /* @__PURE__ */ JSON.parse("{\"ayu-dark\":{\"id\":\"ayu-dark\",\"label\":\"Ayu Dark\",\"vendor\":\"ayu\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#0d1017\",\"surface\":\"#141821\",\"overlay\":\"#1b1f29\"},\"text\":{\"primary\":\"#bfbdb6\",\"secondary\":\"#7c8691\",\"inverse\":\"#0d1017\"},\"brand\":{\"primary\":\"#e6b450\",\"primaryText\":\"#0d1017\"},\"state\":{\"info\":\"#39bae6\",\"success\":\"#aad94c\",\"warning\":\"#ff8f40\",\"danger\":\"#d95757\",\"infoText\":\"#0d1017\",\"successText\":\"#0d1017\",\"warningText\":\"#0d1017\",\"dangerText\":\"#0d1017\"},\"border\":{\"default\":\"#1b1f29\"},\"accent\":{\"link\":\"#ffb454\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#ffb454\",\"h2\":\"#59c2ff\",\"h3\":\"#39bae6\",\"h4\":\"#aad94c\",\"h5\":\"#d2a6ff\",\"h6\":\"#ff8f40\"},\"body\":{\"primary\":\"#bfbdb6\",\"secondary\":\"#7c8691\"},\"link\":{\"default\":\"#ffb454\"},\"selection\":{\"fg\":\"#bfbdb6\",\"bg\":\"#1c212b\"},\"blockquote\":{\"border\":\"#1b1f29\",\"fg\":\"#bfbdb6\",\"bg\":\"#141821\"},\"codeInline\":{\"fg\":\"#bfbdb6\",\"bg\":\"#1b1f29\"},\"codeBlock\":{\"fg\":\"#bfbdb6\",\"bg\":\"#1b1f29\"},\"table\":{\"border\":\"#1b1f29\",\"stripe\":\"#141821\",\"theadBg\":\"#1b1f29\"}}}},\"ayu-light\":{\"id\":\"ayu-light\",\"label\":\"Ayu Light\",\"vendor\":\"ayu\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#f8f9fa\",\"surface\":\"#fafafa\",\"overlay\":\"#e7eaed\"},\"text\":{\"primary\":\"#5c6166\",\"secondary\":\"#656f7c\",\"inverse\":\"#f8f9fa\"},\"brand\":{\"primary\":\"#f29718\",\"primaryText\":\"#343435\"},\"state\":{\"info\":\"#55b4d4\",\"success\":\"#86b300\",\"warning\":\"#ff7e33\",\"danger\":\"#e65050\",\"infoText\":\"#39393a\",\"successText\":\"#373737\",\"warningText\":\"#343435\",\"dangerText\":\"#161617\"},\"border\":{\"default\":\"#e7eaed\"},\"accent\":{\"link\":\"#8160a1\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#c28200\",\"h2\":\"#3696db\",\"h3\":\"#4899b4\",\"h4\":\"#759c00\",\"h5\":\"#a37acc\",\"h6\":\"#e3702d\"},\"body\":{\"primary\":\"#5c6166\",\"secondary\":\"#656f7c\"},\"link\":{\"default\":\"#8160a1\"},\"selection\":{\"fg\":\"#5c6166\",\"bg\":\"#e5e9ed\"},\"blockquote\":{\"border\":\"#e7eaed\",\"fg\":\"#5c6166\",\"bg\":\"#fafafa\"},\"codeInline\":{\"fg\":\"#5c6166\",\"bg\":\"#e7eaed\"},\"codeBlock\":{\"fg\":\"#5c6166\",\"bg\":\"#e7eaed\"},\"table\":{\"border\":\"#e7eaed\",\"stripe\":\"#fafafa\",\"theadBg\":\"#e7eaed\"}}}},\"ayu-mirage\":{\"id\":\"ayu-mirage\",\"label\":\"Ayu Mirage\",\"vendor\":\"ayu\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#1f2430\",\"surface\":\"#282e3b\",\"overlay\":\"#293040\"},\"text\":{\"primary\":\"#cccac2\",\"secondary\":\"#929aa8\",\"inverse\":\"#1f2430\"},\"brand\":{\"primary\":\"#ffcc66\",\"primaryText\":\"#1f2430\"},\"state\":{\"info\":\"#5ccfe6\",\"success\":\"#d5ff80\",\"warning\":\"#ffad66\",\"danger\":\"#ff6666\",\"infoText\":\"#1f2430\",\"successText\":\"#1f2430\",\"warningText\":\"#1f2430\",\"dangerText\":\"#1f2430\"},\"border\":{\"default\":\"#171b24\"},\"accent\":{\"link\":\"#ffd173\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#ffd173\",\"h2\":\"#73d0ff\",\"h3\":\"#5ccfe6\",\"h4\":\"#d5ff80\",\"h5\":\"#dfbfff\",\"h6\":\"#ffad66\"},\"body\":{\"primary\":\"#cccac2\",\"secondary\":\"#929aa8\"},\"link\":{\"default\":\"#ffd173\"},\"selection\":{\"fg\":\"#cccac2\",\"bg\":\"#293040\"},\"blockquote\":{\"border\":\"#171b24\",\"fg\":\"#cccac2\",\"bg\":\"#282e3b\"},\"codeInline\":{\"fg\":\"#cccac2\",\"bg\":\"#293040\"},\"codeBlock\":{\"fg\":\"#cccac2\",\"bg\":\"#293040\"},\"table\":{\"border\":\"#171b24\",\"stripe\":\"#282e3b\",\"theadBg\":\"#293040\"}}}},\"bulma-dark\":{\"id\":\"bulma-dark\",\"label\":\"Bulma Dark\",\"vendor\":\"bulma\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#141414\",\"surface\":\"#1f1f1f\",\"overlay\":\"#2b2b2b\"},\"text\":{\"primary\":\"#f5f5f5\",\"secondary\":\"#dbdbdb\",\"inverse\":\"#141414\"},\"brand\":{\"primary\":\"#00d1b2\",\"primaryText\":\"#141414\"},\"state\":{\"info\":\"#3e8ed0\",\"success\":\"#48c78e\",\"warning\":\"#ffe08a\",\"danger\":\"#f14668\",\"infoText\":\"#141414\",\"successText\":\"#141414\",\"warningText\":\"#141414\",\"dangerText\":\"#141414\"},\"border\":{\"default\":\"#363636\"},\"accent\":{\"link\":\"#7386d4\"},\"typography\":{\"fonts\":{\"sans\":\"\\\"Nunito Sans\\\", BlinkMacSystemFont, -apple-system, \\\"Segoe UI\\\", Roboto, Oxygen, Ubuntu, Cantarell, \\\"Fira Sans\\\", \\\"Droid Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif\",\"mono\":\"\\\"JetBrains Mono\\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;1,6..12,400&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#00d1b2\",\"h2\":\"#7289da\",\"h3\":\"#5dade2\",\"h4\":\"#58d68d\",\"h5\":\"#f7dc6f\",\"h6\":\"#f1948a\"},\"body\":{\"primary\":\"#dbdbdb\",\"secondary\":\"#b5b5b5\"},\"link\":{\"default\":\"#7386d4\"},\"selection\":{\"fg\":\"#f5f5f5\",\"bg\":\"#2f6acb\"},\"blockquote\":{\"border\":\"#363636\",\"fg\":\"#dbdbdb\",\"bg\":\"#1f1f1f\"},\"codeInline\":{\"fg\":\"#f46884\",\"bg\":\"#2b2b2b\"},\"codeBlock\":{\"fg\":\"#f5f5f5\",\"bg\":\"#2b2b2b\"},\"table\":{\"border\":\"#404040\",\"stripe\":\"#1c1c1c\",\"theadBg\":\"#2d2d2d\",\"cellBg\":\"#1a1a1a\",\"headerFg\":\"#f5f5f5\"}},\"spacing\":{\"xs\":\"0.25rem\",\"sm\":\"0.5rem\",\"md\":\"1rem\",\"lg\":\"1.5rem\",\"xl\":\"2rem\"},\"elevation\":{\"none\":\"none\",\"sm\":\"0 1px 2px 0 rgba(0, 0, 0, 0.05)\",\"md\":\"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)\",\"lg\":\"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)\",\"xl\":\"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)\"},\"animation\":{\"durationFast\":\"150ms\",\"durationNormal\":\"300ms\",\"durationSlow\":\"500ms\",\"easingDefault\":\"cubic-bezier(0.4, 0, 0.2, 1)\",\"easingEmphasized\":\"cubic-bezier(0.05, 0.7, 0.1, 1)\"},\"opacity\":{\"disabled\":0.5,\"hover\":0.8,\"pressed\":0.6},\"components\":{\"card\":{\"bg\":\"#1c1c1c\",\"border\":\"#3a3a3a\",\"headerBg\":\"#252525\",\"footerBg\":\"#1f1f1f\"},\"message\":{\"bg\":\"#1f1f1f\",\"headerBg\":\"#2a2a2a\",\"border\":\"#404040\",\"bodyFg\":\"#e0e0e0\"},\"panel\":{\"bg\":\"#1c1c1c\",\"headerBg\":\"#2a2a2a\",\"headerFg\":\"#f5f5f5\",\"border\":\"#3a3a3a\",\"blockBg\":\"#1f1f1f\",\"blockHoverBg\":\"#262626\",\"blockActiveBg\":\"#2d3748\"},\"box\":{\"bg\":\"#1c1c1c\",\"border\":\"#3a3a3a\"},\"notification\":{\"bg\":\"#252525\",\"border\":\"#404040\"},\"modal\":{\"bg\":\"rgba(0, 0, 0, 0.86)\",\"cardBg\":\"#1c1c1c\",\"headerBg\":\"#252525\",\"footerBg\":\"#1f1f1f\"},\"dropdown\":{\"bg\":\"#1c1c1c\",\"itemHoverBg\":\"#2a2a2a\",\"border\":\"#404040\"},\"tabs\":{\"border\":\"#404040\",\"linkBg\":\"#252525\",\"linkActiveBg\":\"#1c1c1c\",\"linkHoverBg\":\"#2a2a2a\"}}}},\"bulma-light\":{\"id\":\"bulma-light\",\"label\":\"Bulma Light\",\"vendor\":\"bulma\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#ffffff\",\"surface\":\"#f5f5f5\",\"overlay\":\"#eeeeee\"},\"text\":{\"primary\":\"#363636\",\"secondary\":\"#4a4a4a\",\"inverse\":\"#ffffff\"},\"brand\":{\"primary\":\"#00d1b2\",\"primaryText\":\"#1c1c1c\"},\"state\":{\"info\":\"#3e8ed0\",\"success\":\"#48c78e\",\"warning\":\"#ffe08a\",\"danger\":\"#f14668\",\"successText\":\"#363636\",\"warningText\":\"#363636\",\"infoText\":\"#1e1e1e\",\"dangerText\":\"#1b1b1b\"},\"border\":{\"default\":\"#dbdbdb\"},\"accent\":{\"link\":\"#485fc7\"},\"typography\":{\"fonts\":{\"sans\":\"\\\"Nunito Sans\\\", BlinkMacSystemFont, -apple-system, \\\"Segoe UI\\\", Roboto, Oxygen, Ubuntu, Cantarell, \\\"Fira Sans\\\", \\\"Droid Sans\\\", \\\"Helvetica Neue\\\", Helvetica, Arial, sans-serif\",\"mono\":\"\\\"JetBrains Mono\\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;1,6..12,400&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#00a088\",\"h2\":\"#485fc7\",\"h3\":\"#3e8ed0\",\"h4\":\"#399f71\",\"h5\":\"#9f8c56\",\"h6\":\"#f14668\"},\"body\":{\"primary\":\"#4a4a4a\",\"secondary\":\"#6b6b6b\"},\"link\":{\"default\":\"#485fc7\"},\"selection\":{\"fg\":\"#363636\",\"bg\":\"#b5d5ff\"},\"blockquote\":{\"border\":\"#dbdbdb\",\"fg\":\"#4a4a4a\",\"bg\":\"#f5f5f5\"},\"codeInline\":{\"fg\":\"#c23853\",\"bg\":\"#f5f5f5\"},\"codeBlock\":{\"fg\":\"#363636\",\"bg\":\"#f5f5f5\"},\"table\":{\"border\":\"#dbdbdb\",\"stripe\":\"#fafafa\",\"theadBg\":\"#f0f0f0\",\"cellBg\":\"#ffffff\",\"headerFg\":\"#363636\"}},\"spacing\":{\"xs\":\"0.25rem\",\"sm\":\"0.5rem\",\"md\":\"1rem\",\"lg\":\"1.5rem\",\"xl\":\"2rem\"},\"elevation\":{\"none\":\"none\",\"sm\":\"0 1px 2px 0 rgba(0, 0, 0, 0.05)\",\"md\":\"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)\",\"lg\":\"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)\",\"xl\":\"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)\"},\"animation\":{\"durationFast\":\"150ms\",\"durationNormal\":\"300ms\",\"durationSlow\":\"500ms\",\"easingDefault\":\"cubic-bezier(0.4, 0, 0.2, 1)\",\"easingEmphasized\":\"cubic-bezier(0.05, 0.7, 0.1, 1)\"},\"opacity\":{\"disabled\":0.5,\"hover\":0.8,\"pressed\":0.6},\"components\":{\"card\":{\"bg\":\"#ffffff\",\"border\":\"#d5d5d5\",\"headerBg\":\"#f5f5f5\",\"footerBg\":\"#fafafa\"},\"message\":{\"bg\":\"#f8f9fa\",\"headerBg\":\"#eef1f4\",\"border\":\"#d5dbe1\",\"bodyFg\":\"#4a4a4a\"},\"panel\":{\"bg\":\"#ffffff\",\"headerBg\":\"#f0f0f0\",\"headerFg\":\"#363636\",\"border\":\"#d5d5d5\",\"blockBg\":\"#fafafa\",\"blockHoverBg\":\"#f5f5f5\",\"blockActiveBg\":\"#eef6fc\"},\"box\":{\"bg\":\"#ffffff\",\"border\":\"#e0e0e0\"},\"notification\":{\"bg\":\"#f5f5f5\",\"border\":\"#e0e0e0\"},\"modal\":{\"bg\":\"rgba(10, 10, 10, 0.86)\",\"cardBg\":\"#ffffff\",\"headerBg\":\"#f5f5f5\",\"footerBg\":\"#fafafa\"},\"dropdown\":{\"bg\":\"#ffffff\",\"itemHoverBg\":\"#f5f5f5\",\"border\":\"#dbdbdb\"},\"tabs\":{\"border\":\"#dbdbdb\",\"linkBg\":\"#f5f5f5\",\"linkActiveBg\":\"#ffffff\",\"linkHoverBg\":\"#eeeeee\"}}}},\"catppuccin-frappe\":{\"id\":\"catppuccin-frappe\",\"label\":\"Catppuccin Frappé\",\"vendor\":\"catppuccin\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#303446\",\"surface\":\"#292c3c\",\"overlay\":\"#232634\"},\"text\":{\"primary\":\"#c6d0f5\",\"secondary\":\"#a5adce\",\"inverse\":\"#303446\"},\"brand\":{\"primary\":\"#8caaee\",\"primaryText\":\"#303446\"},\"state\":{\"info\":\"#99d1db\",\"success\":\"#a6d189\",\"warning\":\"#e5c890\",\"danger\":\"#e78284\",\"infoText\":\"#303446\",\"successText\":\"#303446\",\"warningText\":\"#303446\",\"dangerText\":\"#2f3244\"},\"border\":{\"default\":\"#737994\"},\"accent\":{\"link\":\"#8caaee\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#a6d189\",\"h2\":\"#8caaee\",\"h3\":\"#85c1dc\",\"h4\":\"#e5c890\",\"h5\":\"#ca9ee6\",\"h6\":\"#e78284\"},\"body\":{\"primary\":\"#c6d0f5\",\"secondary\":\"#a5adce\"},\"link\":{\"default\":\"#8caaee\"},\"selection\":{\"fg\":\"#c6d0f5\",\"bg\":\"#515668\"},\"blockquote\":{\"border\":\"#838ba7\",\"fg\":\"#c6d0f5\",\"bg\":\"#292c3c\"},\"codeInline\":{\"fg\":\"#c6d0f5\",\"bg\":\"#414559\"},\"codeBlock\":{\"fg\":\"#c6d0f5\",\"bg\":\"#414559\"},\"table\":{\"border\":\"#838ba7\",\"stripe\":\"#414559\",\"theadBg\":\"#51576d\"}}}},\"catppuccin-latte\":{\"id\":\"catppuccin-latte\",\"label\":\"Catppuccin Latte\",\"vendor\":\"catppuccin\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#eff1f5\",\"surface\":\"#e6e9ef\",\"overlay\":\"#dce0e8\"},\"text\":{\"primary\":\"#4c4f69\",\"secondary\":\"#616477\",\"inverse\":\"#eff1f5\"},\"brand\":{\"primary\":\"#1e66f5\",\"primaryText\":\"#fbfbfc\"},\"state\":{\"info\":\"#0378a7\",\"success\":\"#40a02b\",\"warning\":\"#df8e1d\",\"danger\":\"#d20f39\",\"infoText\":\"#fbfbfb\",\"successText\":\"#212222\",\"warningText\":\"#323333\",\"dangerText\":\"#eff1f5\"},\"border\":{\"default\":\"#9ca0b0\"},\"accent\":{\"link\":\"#1b5cdd\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#3c9829\",\"h2\":\"#1e66f5\",\"h3\":\"#1d92a7\",\"h4\":\"#ba7618\",\"h5\":\"#8839ef\",\"h6\":\"#d20f39\"},\"body\":{\"primary\":\"#4c4f69\",\"secondary\":\"#616477\"},\"link\":{\"default\":\"#1b5cdd\"},\"selection\":{\"fg\":\"#4c4f69\",\"bg\":\"#c6c8d0\"},\"blockquote\":{\"border\":\"#8c8fa1\",\"fg\":\"#4c4f69\",\"bg\":\"#e6e9ef\"},\"codeInline\":{\"fg\":\"#4c4f69\",\"bg\":\"#ccd0da\"},\"codeBlock\":{\"fg\":\"#4c4f69\",\"bg\":\"#ccd0da\"},\"table\":{\"border\":\"#8c8fa1\",\"stripe\":\"#ccd0da\",\"theadBg\":\"#bcc0cc\"}}}},\"catppuccin-macchiato\":{\"id\":\"catppuccin-macchiato\",\"label\":\"Catppuccin Macchiato\",\"vendor\":\"catppuccin\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#24273a\",\"surface\":\"#1e2030\",\"overlay\":\"#181926\"},\"text\":{\"primary\":\"#cad3f5\",\"secondary\":\"#a5adcb\",\"inverse\":\"#24273a\"},\"brand\":{\"primary\":\"#8aadf4\",\"primaryText\":\"#24273a\"},\"state\":{\"info\":\"#91d7e3\",\"success\":\"#a6da95\",\"warning\":\"#eed49f\",\"danger\":\"#ed8796\",\"infoText\":\"#24273a\",\"successText\":\"#24273a\",\"warningText\":\"#24273a\",\"dangerText\":\"#24273a\"},\"border\":{\"default\":\"#6e738d\"},\"accent\":{\"link\":\"#8aadf4\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#a6da95\",\"h2\":\"#8aadf4\",\"h3\":\"#7dc4e4\",\"h4\":\"#eed49f\",\"h5\":\"#c6a0f6\",\"h6\":\"#ed8796\"},\"body\":{\"primary\":\"#cad3f5\",\"secondary\":\"#a5adcb\"},\"link\":{\"default\":\"#8aadf4\"},\"selection\":{\"fg\":\"#cad3f5\",\"bg\":\"#53576a\"},\"blockquote\":{\"border\":\"#8087a2\",\"fg\":\"#cad3f5\",\"bg\":\"#1e2030\"},\"codeInline\":{\"fg\":\"#cad3f5\",\"bg\":\"#363a4f\"},\"codeBlock\":{\"fg\":\"#cad3f5\",\"bg\":\"#363a4f\"},\"table\":{\"border\":\"#8087a2\",\"stripe\":\"#363a4f\",\"theadBg\":\"#494d64\"}}}},\"catppuccin-mocha\":{\"id\":\"catppuccin-mocha\",\"label\":\"Catppuccin Mocha\",\"vendor\":\"catppuccin\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#1e1e2e\",\"surface\":\"#181825\",\"overlay\":\"#11111b\"},\"text\":{\"primary\":\"#cdd6f4\",\"secondary\":\"#a6adc8\",\"inverse\":\"#1e1e2e\"},\"brand\":{\"primary\":\"#89b4fa\",\"primaryText\":\"#1e1e2e\"},\"state\":{\"info\":\"#89dceb\",\"success\":\"#a6e3a1\",\"warning\":\"#f9e2af\",\"danger\":\"#f38ba8\",\"infoText\":\"#1e1e2e\",\"successText\":\"#1e1e2e\",\"warningText\":\"#1e1e2e\",\"dangerText\":\"#1e1e2e\"},\"border\":{\"default\":\"#6c7086\"},\"accent\":{\"link\":\"#89b4fa\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#a6e3a1\",\"h2\":\"#89b4fa\",\"h3\":\"#74c7ec\",\"h4\":\"#f9e2af\",\"h5\":\"#cba6f7\",\"h6\":\"#f38ba8\"},\"body\":{\"primary\":\"#cdd6f4\",\"secondary\":\"#a6adc8\"},\"link\":{\"default\":\"#89b4fa\"},\"selection\":{\"fg\":\"#cdd6f4\",\"bg\":\"#56596a\"},\"blockquote\":{\"border\":\"#7f849c\",\"fg\":\"#cdd6f4\",\"bg\":\"#181825\"},\"codeInline\":{\"fg\":\"#cdd6f4\",\"bg\":\"#313244\"},\"codeBlock\":{\"fg\":\"#cdd6f4\",\"bg\":\"#313244\"},\"table\":{\"border\":\"#7f849c\",\"stripe\":\"#313244\",\"theadBg\":\"#45475a\"}}}},\"dracula\":{\"id\":\"dracula\",\"label\":\"Dracula\",\"vendor\":\"dracula\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#282a36\",\"surface\":\"#21222c\",\"overlay\":\"#44475a\"},\"text\":{\"primary\":\"#f8f8f2\",\"secondary\":\"#8995bb\",\"inverse\":\"#282a36\"},\"brand\":{\"primary\":\"#bd93f9\",\"primaryText\":\"#282a36\"},\"state\":{\"info\":\"#8be9fd\",\"success\":\"#50fa7b\",\"warning\":\"#f1fa8c\",\"danger\":\"#ff5555\",\"infoText\":\"#282a36\",\"successText\":\"#282a36\",\"warningText\":\"#282a36\",\"dangerText\":\"#242631\"},\"border\":{\"default\":\"#44475a\"},\"accent\":{\"link\":\"#8be9fd\"},\"typography\":{\"fonts\":{\"sans\":\"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Roboto, \\\"Helvetica Neue\\\", Arial, sans-serif\",\"mono\":\"\\\"Fira Code\\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#ff79c6\",\"h2\":\"#bd93f9\",\"h3\":\"#8be9fd\",\"h4\":\"#50fa7b\",\"h5\":\"#ffb86c\",\"h6\":\"#f1fa8c\"},\"body\":{\"primary\":\"#f8f8f2\",\"secondary\":\"#8995bb\"},\"link\":{\"default\":\"#8be9fd\"},\"selection\":{\"fg\":\"#f8f8f2\",\"bg\":\"#44475a\"},\"blockquote\":{\"border\":\"#bd93f9\",\"fg\":\"#7f8db5\",\"bg\":\"#21222c\"},\"codeInline\":{\"fg\":\"#50fa7b\",\"bg\":\"#21222c\"},\"codeBlock\":{\"fg\":\"#f8f8f2\",\"bg\":\"#21222c\"},\"table\":{\"border\":\"#44475a\",\"stripe\":\"#21222c\",\"theadBg\":\"#44475a\",\"cellBg\":\"#282a36\",\"headerFg\":\"#f8f8f2\"}},\"spacing\":{\"xs\":\"0.25rem\",\"sm\":\"0.5rem\",\"md\":\"1rem\",\"lg\":\"1.5rem\",\"xl\":\"2rem\"},\"elevation\":{\"none\":\"none\",\"sm\":\"0 1px 2px 0 rgba(0, 0, 0, 0.05)\",\"md\":\"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)\",\"lg\":\"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)\",\"xl\":\"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)\"},\"animation\":{\"durationFast\":\"150ms\",\"durationNormal\":\"300ms\",\"durationSlow\":\"500ms\",\"easingDefault\":\"cubic-bezier(0.4, 0, 0.2, 1)\",\"easingEmphasized\":\"cubic-bezier(0.05, 0.7, 0.1, 1)\"},\"opacity\":{\"disabled\":0.5,\"hover\":0.8,\"pressed\":0.6},\"components\":{\"card\":{\"bg\":\"#21222c\",\"border\":\"#6272a4\",\"headerBg\":\"#282a36\",\"footerBg\":\"#21222c\"},\"message\":{\"bg\":\"#282a36\",\"headerBg\":\"#44475a\",\"border\":\"#6272a4\",\"bodyFg\":\"#f8f8f2\"},\"panel\":{\"bg\":\"#21222c\",\"headerBg\":\"#44475a\",\"headerFg\":\"#f8f8f2\",\"border\":\"#6272a4\",\"blockBg\":\"#282a36\",\"blockHoverBg\":\"#2e303e\",\"blockActiveBg\":\"#44475a\"},\"box\":{\"bg\":\"#21222c\",\"border\":\"#6272a4\"},\"notification\":{\"bg\":\"#282a36\",\"border\":\"#6272a4\"},\"modal\":{\"bg\":\"rgba(40, 42, 54, 0.9)\",\"cardBg\":\"#21222c\",\"headerBg\":\"#282a36\",\"footerBg\":\"#21222c\"},\"dropdown\":{\"bg\":\"#21222c\",\"itemHoverBg\":\"#2e303e\",\"border\":\"#6272a4\"},\"tabs\":{\"border\":\"#6272a4\",\"linkBg\":\"#2e303e\",\"linkActiveBg\":\"#21222c\",\"linkHoverBg\":\"#44475a\"}}}},\"everforest-dark-hard\":{\"id\":\"everforest-dark-hard\",\"label\":\"Everforest Dark Hard\",\"vendor\":\"everforest\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#272E33\",\"surface\":\"#2E383C\",\"overlay\":\"#374145\"},\"text\":{\"primary\":\"#D3C6AA\",\"secondary\":\"#9DA9A0\",\"inverse\":\"#272E33\"},\"brand\":{\"primary\":\"#A7C080\",\"primaryText\":\"#272E33\"},\"state\":{\"info\":\"#7FBBB3\",\"success\":\"#A7C080\",\"warning\":\"#DBBC7F\",\"danger\":\"#E67E80\",\"infoText\":\"#272E33\",\"successText\":\"#272E33\",\"warningText\":\"#272E33\",\"dangerText\":\"#272E33\"},\"border\":{\"default\":\"#495156\"},\"accent\":{\"link\":\"#83C092\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#A7C080\",\"h2\":\"#7FBBB3\",\"h3\":\"#83C092\",\"h4\":\"#DBBC7F\",\"h5\":\"#D699B6\",\"h6\":\"#E67E80\"},\"body\":{\"primary\":\"#D3C6AA\",\"secondary\":\"#9DA9A0\"},\"link\":{\"default\":\"#83C092\"},\"selection\":{\"fg\":\"#D3C6AA\",\"bg\":\"#374145\"},\"blockquote\":{\"border\":\"#495156\",\"fg\":\"#9DA9A0\",\"bg\":\"#2E383C\"},\"codeInline\":{\"fg\":\"#e79e7d\",\"bg\":\"#374145\"},\"codeBlock\":{\"fg\":\"#D3C6AA\",\"bg\":\"#2E383C\"},\"table\":{\"border\":\"#495156\",\"stripe\":\"#374145\",\"theadBg\":\"#2E383C\"}},\"components\":{\"card\":{\"bg\":\"#2E383C\",\"border\":\"#495156\",\"headerBg\":\"#272E33\",\"footerBg\":\"#2E383C\"},\"message\":{\"bg\":\"#272E33\",\"headerBg\":\"#2E383C\",\"border\":\"#495156\",\"bodyFg\":\"#D3C6AA\"},\"panel\":{\"bg\":\"#2E383C\",\"headerBg\":\"#272E33\",\"headerFg\":\"#D3C6AA\",\"border\":\"#495156\",\"blockBg\":\"#272E33\",\"blockHoverBg\":\"#2E383C\",\"blockActiveBg\":\"#374145\"},\"box\":{\"bg\":\"#2E383C\",\"border\":\"#495156\"},\"notification\":{\"bg\":\"#272E33\",\"border\":\"#495156\"},\"modal\":{\"bg\":\"rgba(39, 46, 51, 0.9)\",\"cardBg\":\"#2E383C\",\"headerBg\":\"#272E33\",\"footerBg\":\"#2E383C\"},\"dropdown\":{\"bg\":\"#2E383C\",\"itemHoverBg\":\"#374145\",\"border\":\"#495156\"},\"tabs\":{\"border\":\"#495156\",\"linkBg\":\"#2E383C\",\"linkActiveBg\":\"#272E33\",\"linkHoverBg\":\"#374145\"}}}},\"everforest-dark-soft\":{\"id\":\"everforest-dark-soft\",\"label\":\"Everforest Dark Soft\",\"vendor\":\"everforest\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#333C43\",\"surface\":\"#3A464C\",\"overlay\":\"#434F55\"},\"text\":{\"primary\":\"#D3C6AA\",\"secondary\":\"#aeb8b0\",\"inverse\":\"#333C43\"},\"brand\":{\"primary\":\"#A7C080\",\"primaryText\":\"#333C43\"},\"state\":{\"info\":\"#7FBBB3\",\"success\":\"#A7C080\",\"warning\":\"#DBBC7F\",\"danger\":\"#E67E80\",\"dangerText\":\"#2a3238\",\"infoText\":\"#333C43\",\"successText\":\"#333C43\",\"warningText\":\"#333C43\"},\"border\":{\"default\":\"#555F66\"},\"accent\":{\"link\":\"#88c396\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#A7C080\",\"h2\":\"#7FBBB3\",\"h3\":\"#83C092\",\"h4\":\"#DBBC7F\",\"h5\":\"#D699B6\",\"h6\":\"#E67E80\"},\"body\":{\"primary\":\"#D3C6AA\",\"secondary\":\"#aeb8b0\"},\"link\":{\"default\":\"#88c396\"},\"selection\":{\"fg\":\"#D3C6AA\",\"bg\":\"#434F55\"},\"blockquote\":{\"border\":\"#555F66\",\"fg\":\"#aeb8b0\",\"bg\":\"#3A464C\"},\"codeInline\":{\"fg\":\"#edb79d\",\"bg\":\"#434F55\"},\"codeBlock\":{\"fg\":\"#D3C6AA\",\"bg\":\"#3A464C\"},\"table\":{\"border\":\"#555F66\",\"stripe\":\"#434F55\",\"theadBg\":\"#3A464C\"}},\"components\":{\"card\":{\"bg\":\"#3A464C\",\"border\":\"#555F66\",\"headerBg\":\"#333C43\",\"footerBg\":\"#3A464C\"},\"message\":{\"bg\":\"#333C43\",\"headerBg\":\"#3A464C\",\"border\":\"#555F66\",\"bodyFg\":\"#D3C6AA\"},\"panel\":{\"bg\":\"#3A464C\",\"headerBg\":\"#333C43\",\"headerFg\":\"#D3C6AA\",\"border\":\"#555F66\",\"blockBg\":\"#333C43\",\"blockHoverBg\":\"#3A464C\",\"blockActiveBg\":\"#434F55\"},\"box\":{\"bg\":\"#3A464C\",\"border\":\"#555F66\"},\"notification\":{\"bg\":\"#333C43\",\"border\":\"#555F66\"},\"modal\":{\"bg\":\"rgba(51, 60, 67, 0.9)\",\"cardBg\":\"#3A464C\",\"headerBg\":\"#333C43\",\"footerBg\":\"#3A464C\"},\"dropdown\":{\"bg\":\"#3A464C\",\"itemHoverBg\":\"#434F55\",\"border\":\"#555F66\"},\"tabs\":{\"border\":\"#555F66\",\"linkBg\":\"#3A464C\",\"linkActiveBg\":\"#333C43\",\"linkHoverBg\":\"#434F55\"}}}},\"everforest-dark\":{\"id\":\"everforest-dark\",\"label\":\"Everforest Dark\",\"vendor\":\"everforest\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#2D353B\",\"surface\":\"#343F44\",\"overlay\":\"#3D484D\"},\"text\":{\"primary\":\"#D3C6AA\",\"secondary\":\"#a4afa7\",\"inverse\":\"#2D353B\"},\"brand\":{\"primary\":\"#A7C080\",\"primaryText\":\"#2D353B\"},\"state\":{\"info\":\"#7FBBB3\",\"success\":\"#A7C080\",\"warning\":\"#DBBC7F\",\"danger\":\"#E67E80\",\"infoText\":\"#2D353B\",\"successText\":\"#2D353B\",\"warningText\":\"#2D353B\",\"dangerText\":\"#2a3237\"},\"border\":{\"default\":\"#4F585E\"},\"accent\":{\"link\":\"#83C092\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#A7C080\",\"h2\":\"#7FBBB3\",\"h3\":\"#83C092\",\"h4\":\"#DBBC7F\",\"h5\":\"#D699B6\",\"h6\":\"#E67E80\"},\"body\":{\"primary\":\"#D3C6AA\",\"secondary\":\"#a4afa7\"},\"link\":{\"default\":\"#83C092\"},\"selection\":{\"fg\":\"#D3C6AA\",\"bg\":\"#3D484D\"},\"blockquote\":{\"border\":\"#4F585E\",\"fg\":\"#a4afa7\",\"bg\":\"#343F44\"},\"codeInline\":{\"fg\":\"#eaaa8d\",\"bg\":\"#3D484D\"},\"codeBlock\":{\"fg\":\"#D3C6AA\",\"bg\":\"#343F44\"},\"table\":{\"border\":\"#4F585E\",\"stripe\":\"#3D484D\",\"theadBg\":\"#343F44\"}},\"components\":{\"card\":{\"bg\":\"#343F44\",\"border\":\"#4F585E\",\"headerBg\":\"#2D353B\",\"footerBg\":\"#343F44\"},\"message\":{\"bg\":\"#2D353B\",\"headerBg\":\"#343F44\",\"border\":\"#4F585E\",\"bodyFg\":\"#D3C6AA\"},\"panel\":{\"bg\":\"#343F44\",\"headerBg\":\"#2D353B\",\"headerFg\":\"#D3C6AA\",\"border\":\"#4F585E\",\"blockBg\":\"#2D353B\",\"blockHoverBg\":\"#343F44\",\"blockActiveBg\":\"#3D484D\"},\"box\":{\"bg\":\"#343F44\",\"border\":\"#4F585E\"},\"notification\":{\"bg\":\"#2D353B\",\"border\":\"#4F585E\"},\"modal\":{\"bg\":\"rgba(45, 53, 59, 0.9)\",\"cardBg\":\"#343F44\",\"headerBg\":\"#2D353B\",\"footerBg\":\"#343F44\"},\"dropdown\":{\"bg\":\"#343F44\",\"itemHoverBg\":\"#3D484D\",\"border\":\"#4F585E\"},\"tabs\":{\"border\":\"#4F585E\",\"linkBg\":\"#343F44\",\"linkActiveBg\":\"#2D353B\",\"linkHoverBg\":\"#3D484D\"}}}},\"everforest-light-hard\":{\"id\":\"everforest-light-hard\",\"label\":\"Everforest Light Hard\",\"vendor\":\"everforest\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#FFFBEF\",\"surface\":\"#F8F5E4\",\"overlay\":\"#EDEADA\"},\"text\":{\"primary\":\"#5C6A72\",\"secondary\":\"#606e75\",\"inverse\":\"#FFFBEF\"},\"brand\":{\"primary\":\"#697a01\",\"primaryText\":\"#fffefc\"},\"state\":{\"info\":\"#2A7A9E\",\"success\":\"#697a01\",\"warning\":\"#A87800\",\"danger\":\"#D03A38\",\"infoText\":\"#fffef9\",\"successText\":\"#fffefc\",\"warningText\":\"#121211\",\"dangerText\":\"#fffdf7\"},\"border\":{\"default\":\"#E8E5D5\"},\"accent\":{\"link\":\"#1D6B4F\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#6B7C01\",\"h2\":\"#2A7A9E\",\"h3\":\"#1D6B4F\",\"h4\":\"#A87800\",\"h5\":\"#B84F96\",\"h6\":\"#D03A38\"},\"body\":{\"primary\":\"#5C6A72\",\"secondary\":\"#606e75\"},\"link\":{\"default\":\"#1D6B4F\"},\"selection\":{\"fg\":\"#5C6A72\",\"bg\":\"#f0eddf\"},\"blockquote\":{\"border\":\"#E8E5D5\",\"fg\":\"#606e75\",\"bg\":\"#F8F5E4\"},\"codeInline\":{\"fg\":\"#a64b10\",\"bg\":\"#EDEADA\"},\"codeBlock\":{\"fg\":\"#5C6A72\",\"bg\":\"#F8F5E4\"},\"table\":{\"border\":\"#E8E5D5\",\"stripe\":\"#EDEADA\",\"theadBg\":\"#F8F5E4\"}},\"components\":{\"card\":{\"bg\":\"#FFFBEF\",\"border\":\"#E8E5D5\",\"headerBg\":\"#F8F5E4\",\"footerBg\":\"#F8F5E4\"},\"message\":{\"bg\":\"#F8F5E4\",\"headerBg\":\"#FFFBEF\",\"border\":\"#E8E5D5\",\"bodyFg\":\"#5C6A72\"},\"panel\":{\"bg\":\"#FFFBEF\",\"headerBg\":\"#F8F5E4\",\"headerFg\":\"#5C6A72\",\"border\":\"#E8E5D5\",\"blockBg\":\"#F8F5E4\",\"blockHoverBg\":\"#FFFBEF\",\"blockActiveBg\":\"#EDEADA\"},\"box\":{\"bg\":\"#FFFBEF\",\"border\":\"#E8E5D5\"},\"notification\":{\"bg\":\"#F8F5E4\",\"border\":\"#E8E5D5\"},\"modal\":{\"bg\":\"rgba(92, 106, 114, 0.86)\",\"cardBg\":\"#FFFBEF\",\"headerBg\":\"#F8F5E4\",\"footerBg\":\"#F8F5E4\"},\"dropdown\":{\"bg\":\"#FFFBEF\",\"itemHoverBg\":\"#F8F5E4\",\"border\":\"#E8E5D5\"},\"tabs\":{\"border\":\"#E8E5D5\",\"linkBg\":\"#F8F5E4\",\"linkActiveBg\":\"#FFFBEF\",\"linkHoverBg\":\"#EDEADA\"}}}},\"everforest-light-soft\":{\"id\":\"everforest-light-soft\",\"label\":\"Everforest Light Soft\",\"vendor\":\"everforest\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#F3EAD3\",\"surface\":\"#EAE4CA\",\"overlay\":\"#DDD8BE\"},\"text\":{\"primary\":\"#56646c\",\"secondary\":\"#56646a\",\"inverse\":\"#F3EAD3\"},\"brand\":{\"primary\":\"#697a01\",\"primaryText\":\"#fffefd\"},\"state\":{\"info\":\"#2A7A9E\",\"success\":\"#697a01\",\"warning\":\"#A87800\",\"danger\":\"#D03A38\",\"infoText\":\"#fefefc\",\"successText\":\"#fffefd\",\"warningText\":\"#11100f\",\"dangerText\":\"#fefdfa\"},\"border\":{\"default\":\"#D8D3BA\"},\"accent\":{\"link\":\"#1D6B4F\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#6B7C01\",\"h2\":\"#2A7A9E\",\"h3\":\"#1D6B4F\",\"h4\":\"#A87800\",\"h5\":\"#B84F96\",\"h6\":\"#D03A38\"},\"body\":{\"primary\":\"#56646c\",\"secondary\":\"#56646a\"},\"link\":{\"default\":\"#1D6B4F\"},\"selection\":{\"fg\":\"#5C6A72\",\"bg\":\"#efede0\"},\"blockquote\":{\"border\":\"#D8D3BA\",\"fg\":\"#57646b\",\"bg\":\"#EAE4CA\"},\"codeInline\":{\"fg\":\"#92430e\",\"bg\":\"#DDD8BE\"},\"codeBlock\":{\"fg\":\"#5a6870\",\"bg\":\"#F3EAD3\"},\"table\":{\"border\":\"#D8D3BA\",\"stripe\":\"#DDD8BE\",\"theadBg\":\"#EAE4CA\"}},\"components\":{\"card\":{\"bg\":\"#F3EAD3\",\"border\":\"#D8D3BA\",\"headerBg\":\"#EAE4CA\",\"footerBg\":\"#EAE4CA\"},\"message\":{\"bg\":\"#EAE4CA\",\"headerBg\":\"#F3EAD3\",\"border\":\"#D8D3BA\",\"bodyFg\":\"#5C6A72\"},\"panel\":{\"bg\":\"#F3EAD3\",\"headerBg\":\"#EAE4CA\",\"headerFg\":\"#5C6A72\",\"border\":\"#D8D3BA\",\"blockBg\":\"#EAE4CA\",\"blockHoverBg\":\"#F3EAD3\",\"blockActiveBg\":\"#DDD8BE\"},\"box\":{\"bg\":\"#F3EAD3\",\"border\":\"#D8D3BA\"},\"notification\":{\"bg\":\"#EAE4CA\",\"border\":\"#D8D3BA\"},\"modal\":{\"bg\":\"rgba(92, 106, 114, 0.86)\",\"cardBg\":\"#F3EAD3\",\"headerBg\":\"#EAE4CA\",\"footerBg\":\"#EAE4CA\"},\"dropdown\":{\"bg\":\"#F3EAD3\",\"itemHoverBg\":\"#EAE4CA\",\"border\":\"#D8D3BA\"},\"tabs\":{\"border\":\"#D8D3BA\",\"linkBg\":\"#EAE4CA\",\"linkActiveBg\":\"#F3EAD3\",\"linkHoverBg\":\"#DDD8BE\"}}}},\"everforest-light\":{\"id\":\"everforest-light\",\"label\":\"Everforest Light\",\"vendor\":\"everforest\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#FDF6E3\",\"surface\":\"#F4F0D9\",\"overlay\":\"#E6E2CC\"},\"text\":{\"primary\":\"#5C6A72\",\"secondary\":\"#5e6b72\",\"inverse\":\"#FDF6E3\"},\"brand\":{\"primary\":\"#697a01\",\"primaryText\":\"#fffefc\"},\"state\":{\"info\":\"#2A7A9E\",\"success\":\"#697a01\",\"warning\":\"#A87800\",\"danger\":\"#D03A38\",\"infoText\":\"#fffefb\",\"successText\":\"#fffefc\",\"warningText\":\"#121110\",\"dangerText\":\"#fffdf8\"},\"border\":{\"default\":\"#BDC3AF\"},\"accent\":{\"link\":\"#1D6B4F\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#6B7C01\",\"h2\":\"#2A7A9E\",\"h3\":\"#1D6B4F\",\"h4\":\"#A87800\",\"h5\":\"#B84F96\",\"h6\":\"#D03A38\"},\"body\":{\"primary\":\"#5C6A72\",\"secondary\":\"#5e6b72\"},\"link\":{\"default\":\"#1D6B4F\"},\"selection\":{\"fg\":\"#5C6A72\",\"bg\":\"#f0eddf\"},\"blockquote\":{\"border\":\"#BDC3AF\",\"fg\":\"#5d6b72\",\"bg\":\"#F4F0D9\"},\"codeInline\":{\"fg\":\"#9c480f\",\"bg\":\"#E6E2CC\"},\"codeBlock\":{\"fg\":\"#5C6A72\",\"bg\":\"#F4F0D9\"},\"table\":{\"border\":\"#BDC3AF\",\"stripe\":\"#E6E2CC\",\"theadBg\":\"#F4F0D9\"}},\"components\":{\"card\":{\"bg\":\"#FDF6E3\",\"border\":\"#BDC3AF\",\"headerBg\":\"#F4F0D9\",\"footerBg\":\"#F4F0D9\"},\"message\":{\"bg\":\"#F4F0D9\",\"headerBg\":\"#FDF6E3\",\"border\":\"#BDC3AF\",\"bodyFg\":\"#5C6A72\"},\"panel\":{\"bg\":\"#FDF6E3\",\"headerBg\":\"#F4F0D9\",\"headerFg\":\"#5C6A72\",\"border\":\"#BDC3AF\",\"blockBg\":\"#F4F0D9\",\"blockHoverBg\":\"#FDF6E3\",\"blockActiveBg\":\"#E6E2CC\"},\"box\":{\"bg\":\"#FDF6E3\",\"border\":\"#BDC3AF\"},\"notification\":{\"bg\":\"#F4F0D9\",\"border\":\"#BDC3AF\"},\"modal\":{\"bg\":\"rgba(92, 106, 114, 0.86)\",\"cardBg\":\"#FDF6E3\",\"headerBg\":\"#F4F0D9\",\"footerBg\":\"#F4F0D9\"},\"dropdown\":{\"bg\":\"#FDF6E3\",\"itemHoverBg\":\"#F4F0D9\",\"border\":\"#BDC3AF\"},\"tabs\":{\"border\":\"#BDC3AF\",\"linkBg\":\"#F4F0D9\",\"linkActiveBg\":\"#FDF6E3\",\"linkHoverBg\":\"#E6E2CC\"}}}},\"github-dark\":{\"id\":\"github-dark\",\"label\":\"GitHub Dark\",\"vendor\":\"github\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#0d1117\",\"surface\":\"#151b23\",\"overlay\":\"#010409\"},\"text\":{\"primary\":\"#f0f6fc\",\"secondary\":\"#9198a1\",\"inverse\":\"#ffffff\"},\"brand\":{\"primary\":\"#1e6de6\",\"primaryText\":\"#ffffff\"},\"state\":{\"info\":\"#3573c1\",\"success\":\"#3fb950\",\"warning\":\"#d29922\",\"danger\":\"#f85149\",\"successText\":\"#0d1117\",\"warningText\":\"#0d1117\",\"infoText\":\"#fdfeff\",\"dangerText\":\"#0d1117\"},\"border\":{\"default\":\"#3d444d\"},\"accent\":{\"link\":\"#4493f8\"},\"typography\":{\"fonts\":{\"sans\":\"\\\"Mona Sans\\\", -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", \\\"Noto Sans\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"\\\"Hubot Sans\\\", ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, \\\"Liberation Mono\\\", monospace\"},\"webFonts\":[\"https://github.githubassets.com/assets/mona-sans-webfont.woff2\",\"https://github.githubassets.com/assets/hubot-sans-webfont.woff2\"]},\"content\":{\"heading\":{\"h1\":\"#3fb950\",\"h2\":\"#4493f8\",\"h3\":\"#1f6feb\",\"h4\":\"#d29922\",\"h5\":\"#3fb950\",\"h6\":\"#f85149\"},\"body\":{\"primary\":\"#f0f6fc\",\"secondary\":\"#9198a1\"},\"link\":{\"default\":\"#4493f8\"},\"selection\":{\"fg\":\"#f0f6fc\",\"bg\":\"#264f78\"},\"blockquote\":{\"border\":\"#3d444d\",\"fg\":\"#9198a1\",\"bg\":\"#151b23\"},\"codeInline\":{\"fg\":\"#f0f6fc\",\"bg\":\"#151b23\"},\"codeBlock\":{\"fg\":\"#f0f6fc\",\"bg\":\"#151b23\"},\"table\":{\"border\":\"#3d444d\",\"stripe\":\"#151b23\",\"theadBg\":\"#151b23\"}}}},\"github-light\":{\"id\":\"github-light\",\"label\":\"GitHub Light\",\"vendor\":\"github\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#ffffff\",\"surface\":\"#f6f8fa\",\"overlay\":\"#f6f8fa\"},\"text\":{\"primary\":\"#1f2328\",\"secondary\":\"#59636e\",\"inverse\":\"#ffffff\"},\"brand\":{\"primary\":\"#0969da\",\"primaryText\":\"#fcfcfc\"},\"state\":{\"info\":\"#0969da\",\"success\":\"#1a7f37\",\"warning\":\"#9a6700\",\"danger\":\"#d1242f\",\"infoText\":\"#f6f6f6\",\"successText\":\"#f8f8f9\",\"warningText\":\"#fdfdfd\",\"dangerText\":\"#f4f4f4\"},\"border\":{\"default\":\"#d1d9e0\"},\"accent\":{\"link\":\"#0969da\"},\"typography\":{\"fonts\":{\"sans\":\"\\\"Mona Sans\\\", -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", \\\"Noto Sans\\\", Helvetica, Arial, sans-serif, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"\\\"Hubot Sans\\\", ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, \\\"Liberation Mono\\\", monospace\"},\"webFonts\":[\"https://github.githubassets.com/assets/mona-sans-webfont.woff2\",\"https://github.githubassets.com/assets/hubot-sans-webfont.woff2\"]},\"content\":{\"heading\":{\"h1\":\"#1a7f37\",\"h2\":\"#0969da\",\"h3\":\"#0969da\",\"h4\":\"#9a6700\",\"h5\":\"#1a7f37\",\"h6\":\"#d1242f\"},\"body\":{\"primary\":\"#1f2328\",\"secondary\":\"#59636e\"},\"link\":{\"default\":\"#0969da\"},\"selection\":{\"fg\":\"#1f2328\",\"bg\":\"#b6e3ff\"},\"blockquote\":{\"border\":\"#d1d9e0\",\"fg\":\"#59636e\",\"bg\":\"#f6f8fa\"},\"codeInline\":{\"fg\":\"#1f2328\",\"bg\":\"#f6f8fa\"},\"codeBlock\":{\"fg\":\"#1f2328\",\"bg\":\"#f6f8fa\"},\"table\":{\"border\":\"#d1d9e0\",\"stripe\":\"#f6f8fa\",\"theadBg\":\"#f6f8fa\"}}}},\"gruvbox-dark-hard\":{\"id\":\"gruvbox-dark-hard\",\"label\":\"Gruvbox Dark Hard\",\"vendor\":\"gruvbox\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#1d2021\",\"surface\":\"#282828\",\"overlay\":\"#3c3836\"},\"text\":{\"primary\":\"#ebdbb2\",\"secondary\":\"#d5c4a1\",\"inverse\":\"#1d2021\"},\"brand\":{\"primary\":\"#d79921\",\"primaryText\":\"#1d2021\"},\"state\":{\"info\":\"#83a598\",\"success\":\"#b8bb26\",\"warning\":\"#fabd2f\",\"danger\":\"#fb4934\",\"infoText\":\"#1d2021\",\"successText\":\"#1d2021\",\"warningText\":\"#1d2021\",\"dangerText\":\"#1d2021\"},\"border\":{\"default\":\"#665c54\"},\"accent\":{\"link\":\"#83a598\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#b8bb26\",\"h2\":\"#83a598\",\"h3\":\"#8ec07c\",\"h4\":\"#fabd2f\",\"h5\":\"#d3869b\",\"h6\":\"#fb4934\"},\"body\":{\"primary\":\"#ebdbb2\",\"secondary\":\"#d5c4a1\"},\"link\":{\"default\":\"#83a598\"},\"selection\":{\"fg\":\"#ebdbb2\",\"bg\":\"#3c3836\"},\"blockquote\":{\"border\":\"#665c54\",\"fg\":\"#d5c4a1\",\"bg\":\"#282828\"},\"codeInline\":{\"fg\":\"#fe8625\",\"bg\":\"#3c3836\"},\"codeBlock\":{\"fg\":\"#ebdbb2\",\"bg\":\"#282828\"},\"table\":{\"border\":\"#665c54\",\"stripe\":\"#3c3836\",\"theadBg\":\"#282828\"}},\"components\":{\"card\":{\"bg\":\"#282828\",\"border\":\"#665c54\",\"headerBg\":\"#1d2021\",\"footerBg\":\"#282828\"},\"message\":{\"bg\":\"#1d2021\",\"headerBg\":\"#282828\",\"border\":\"#665c54\",\"bodyFg\":\"#ebdbb2\"},\"panel\":{\"bg\":\"#282828\",\"headerBg\":\"#1d2021\",\"headerFg\":\"#ebdbb2\",\"border\":\"#665c54\",\"blockBg\":\"#1d2021\",\"blockHoverBg\":\"#282828\",\"blockActiveBg\":\"#3c3836\"},\"box\":{\"bg\":\"#282828\",\"border\":\"#665c54\"},\"notification\":{\"bg\":\"#1d2021\",\"border\":\"#665c54\"},\"modal\":{\"bg\":\"rgba(29, 32, 33, 0.9)\",\"cardBg\":\"#282828\",\"headerBg\":\"#1d2021\",\"footerBg\":\"#282828\"},\"dropdown\":{\"bg\":\"#282828\",\"itemHoverBg\":\"#3c3836\",\"border\":\"#665c54\"},\"tabs\":{\"border\":\"#665c54\",\"linkBg\":\"#282828\",\"linkActiveBg\":\"#1d2021\",\"linkHoverBg\":\"#3c3836\"}}}},\"gruvbox-dark-soft\":{\"id\":\"gruvbox-dark-soft\",\"label\":\"Gruvbox Dark Soft\",\"vendor\":\"gruvbox\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#32302f\",\"surface\":\"#3c3836\",\"overlay\":\"#504945\"},\"text\":{\"primary\":\"#ebdbb2\",\"secondary\":\"#d5c4a1\",\"inverse\":\"#32302f\"},\"brand\":{\"primary\":\"#d79921\",\"primaryText\":\"#32302f\"},\"state\":{\"info\":\"#83a598\",\"success\":\"#b8bb26\",\"warning\":\"#fabd2f\",\"danger\":\"#fb4934\",\"dangerText\":\"#211f1f\",\"infoText\":\"#32302f\",\"successText\":\"#32302f\",\"warningText\":\"#32302f\"},\"border\":{\"default\":\"#665c54\"},\"accent\":{\"link\":\"#8dada0\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#b8bb26\",\"h2\":\"#83a598\",\"h3\":\"#8ec07c\",\"h4\":\"#fabd2f\",\"h5\":\"#d3869b\",\"h6\":\"#fb4934\"},\"body\":{\"primary\":\"#ebdbb2\",\"secondary\":\"#d5c4a1\"},\"link\":{\"default\":\"#8dada0\"},\"selection\":{\"fg\":\"#ebdbb2\",\"bg\":\"#504945\"},\"blockquote\":{\"border\":\"#665c54\",\"fg\":\"#d5c4a1\",\"bg\":\"#3c3836\"},\"codeInline\":{\"fg\":\"#feac69\",\"bg\":\"#504945\"},\"codeBlock\":{\"fg\":\"#ebdbb2\",\"bg\":\"#3c3836\"},\"table\":{\"border\":\"#665c54\",\"stripe\":\"#504945\",\"theadBg\":\"#3c3836\"}},\"components\":{\"card\":{\"bg\":\"#3c3836\",\"border\":\"#665c54\",\"headerBg\":\"#32302f\",\"footerBg\":\"#3c3836\"},\"message\":{\"bg\":\"#32302f\",\"headerBg\":\"#3c3836\",\"border\":\"#665c54\",\"bodyFg\":\"#ebdbb2\"},\"panel\":{\"bg\":\"#3c3836\",\"headerBg\":\"#32302f\",\"headerFg\":\"#ebdbb2\",\"border\":\"#665c54\",\"blockBg\":\"#32302f\",\"blockHoverBg\":\"#3c3836\",\"blockActiveBg\":\"#504945\"},\"box\":{\"bg\":\"#3c3836\",\"border\":\"#665c54\"},\"notification\":{\"bg\":\"#32302f\",\"border\":\"#665c54\"},\"modal\":{\"bg\":\"rgba(50, 48, 47, 0.9)\",\"cardBg\":\"#3c3836\",\"headerBg\":\"#32302f\",\"footerBg\":\"#3c3836\"},\"dropdown\":{\"bg\":\"#3c3836\",\"itemHoverBg\":\"#504945\",\"border\":\"#665c54\"},\"tabs\":{\"border\":\"#665c54\",\"linkBg\":\"#3c3836\",\"linkActiveBg\":\"#32302f\",\"linkHoverBg\":\"#504945\"}}}},\"gruvbox-dark\":{\"id\":\"gruvbox-dark\",\"label\":\"Gruvbox Dark\",\"vendor\":\"gruvbox\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#282828\",\"surface\":\"#3c3836\",\"overlay\":\"#504945\"},\"text\":{\"primary\":\"#ebdbb2\",\"secondary\":\"#d5c4a1\",\"inverse\":\"#282828\"},\"brand\":{\"primary\":\"#d79921\",\"primaryText\":\"#282828\"},\"state\":{\"info\":\"#83a598\",\"success\":\"#b8bb26\",\"warning\":\"#fabd2f\",\"danger\":\"#fb4934\",\"dangerText\":\"#1f1f1f\",\"infoText\":\"#282828\",\"successText\":\"#282828\",\"warningText\":\"#282828\"},\"border\":{\"default\":\"#665c54\"},\"accent\":{\"link\":\"#8dada0\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#b8bb26\",\"h2\":\"#83a598\",\"h3\":\"#8ec07c\",\"h4\":\"#fabd2f\",\"h5\":\"#d3869b\",\"h6\":\"#fb4934\"},\"body\":{\"primary\":\"#ebdbb2\",\"secondary\":\"#d5c4a1\"},\"link\":{\"default\":\"#8dada0\"},\"selection\":{\"fg\":\"#ebdbb2\",\"bg\":\"#504945\"},\"blockquote\":{\"border\":\"#665c54\",\"fg\":\"#d5c4a1\",\"bg\":\"#3c3836\"},\"codeInline\":{\"fg\":\"#feac69\",\"bg\":\"#504945\"},\"codeBlock\":{\"fg\":\"#ebdbb2\",\"bg\":\"#3c3836\"},\"table\":{\"border\":\"#665c54\",\"stripe\":\"#504945\",\"theadBg\":\"#3c3836\"}},\"components\":{\"card\":{\"bg\":\"#3c3836\",\"border\":\"#665c54\",\"headerBg\":\"#282828\",\"footerBg\":\"#3c3836\"},\"message\":{\"bg\":\"#282828\",\"headerBg\":\"#3c3836\",\"border\":\"#665c54\",\"bodyFg\":\"#ebdbb2\"},\"panel\":{\"bg\":\"#3c3836\",\"headerBg\":\"#282828\",\"headerFg\":\"#ebdbb2\",\"border\":\"#665c54\",\"blockBg\":\"#282828\",\"blockHoverBg\":\"#3c3836\",\"blockActiveBg\":\"#504945\"},\"box\":{\"bg\":\"#3c3836\",\"border\":\"#665c54\"},\"notification\":{\"bg\":\"#282828\",\"border\":\"#665c54\"},\"modal\":{\"bg\":\"rgba(40, 40, 40, 0.9)\",\"cardBg\":\"#3c3836\",\"headerBg\":\"#282828\",\"footerBg\":\"#3c3836\"},\"dropdown\":{\"bg\":\"#3c3836\",\"itemHoverBg\":\"#504945\",\"border\":\"#665c54\"},\"tabs\":{\"border\":\"#665c54\",\"linkBg\":\"#3c3836\",\"linkActiveBg\":\"#282828\",\"linkHoverBg\":\"#504945\"}}}},\"gruvbox-light-hard\":{\"id\":\"gruvbox-light-hard\",\"label\":\"Gruvbox Light Hard\",\"vendor\":\"gruvbox\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#f9f5d7\",\"surface\":\"#fbf1c7\",\"overlay\":\"#ebdbb2\"},\"text\":{\"primary\":\"#3c3836\",\"secondary\":\"#504945\",\"inverse\":\"#f9f5d7\"},\"brand\":{\"primary\":\"#b57614\",\"primaryText\":\"#0f0f0d\"},\"state\":{\"info\":\"#478e9b\",\"success\":\"#79740e\",\"warning\":\"#b57614\",\"danger\":\"#9d0006\",\"successText\":\"#fefdf5\",\"warningText\":\"#161613\",\"infoText\":\"#161613\",\"dangerText\":\"#f9f5d7\"},\"border\":{\"default\":\"#bdae93\"},\"accent\":{\"link\":\"#076678\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#79740e\",\"h2\":\"#076678\",\"h3\":\"#427b58\",\"h4\":\"#b57614\",\"h5\":\"#8f3f71\",\"h6\":\"#9d0006\"},\"body\":{\"primary\":\"#3c3836\",\"secondary\":\"#504945\"},\"link\":{\"default\":\"#076678\"},\"selection\":{\"fg\":\"#3c3836\",\"bg\":\"#ebdbb2\"},\"blockquote\":{\"border\":\"#bdae93\",\"fg\":\"#504945\",\"bg\":\"#fbf1c7\"},\"codeInline\":{\"fg\":\"#a83703\",\"bg\":\"#ebdbb2\"},\"codeBlock\":{\"fg\":\"#3c3836\",\"bg\":\"#fbf1c7\"},\"table\":{\"border\":\"#bdae93\",\"stripe\":\"#ebdbb2\",\"theadBg\":\"#fbf1c7\"}},\"components\":{\"card\":{\"bg\":\"#f9f5d7\",\"border\":\"#bdae93\",\"headerBg\":\"#fbf1c7\",\"footerBg\":\"#fbf1c7\"},\"message\":{\"bg\":\"#fbf1c7\",\"headerBg\":\"#f9f5d7\",\"border\":\"#bdae93\",\"bodyFg\":\"#3c3836\"},\"panel\":{\"bg\":\"#f9f5d7\",\"headerBg\":\"#fbf1c7\",\"headerFg\":\"#3c3836\",\"border\":\"#bdae93\",\"blockBg\":\"#fbf1c7\",\"blockHoverBg\":\"#f9f5d7\",\"blockActiveBg\":\"#ebdbb2\"},\"box\":{\"bg\":\"#f9f5d7\",\"border\":\"#bdae93\"},\"notification\":{\"bg\":\"#fbf1c7\",\"border\":\"#bdae93\"},\"modal\":{\"bg\":\"rgba(60, 56, 54, 0.86)\",\"cardBg\":\"#f9f5d7\",\"headerBg\":\"#fbf1c7\",\"footerBg\":\"#fbf1c7\"},\"dropdown\":{\"bg\":\"#f9f5d7\",\"itemHoverBg\":\"#fbf1c7\",\"border\":\"#bdae93\"},\"tabs\":{\"border\":\"#bdae93\",\"linkBg\":\"#fbf1c7\",\"linkActiveBg\":\"#f9f5d7\",\"linkHoverBg\":\"#ebdbb2\"}}}},\"gruvbox-light-soft\":{\"id\":\"gruvbox-light-soft\",\"label\":\"Gruvbox Light Soft\",\"vendor\":\"gruvbox\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#f2e5bc\",\"surface\":\"#ebdbb2\",\"overlay\":\"#d5c4a1\"},\"text\":{\"primary\":\"#3c3836\",\"secondary\":\"#504945\",\"inverse\":\"#f2e5bc\"},\"brand\":{\"primary\":\"#b57614\",\"primaryText\":\"#100f0d\"},\"state\":{\"info\":\"#478e9b\",\"success\":\"#79740e\",\"warning\":\"#b57614\",\"danger\":\"#9d0006\",\"warningText\":\"#181713\",\"successText\":\"#fefdf9\",\"infoText\":\"#181713\",\"dangerText\":\"#f2e5bc\"},\"border\":{\"default\":\"#bdae93\"},\"accent\":{\"link\":\"#076678\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#79740e\",\"h2\":\"#076678\",\"h3\":\"#427b58\",\"h4\":\"#ac7013\",\"h5\":\"#8f3f71\",\"h6\":\"#9d0006\"},\"body\":{\"primary\":\"#3c3836\",\"secondary\":\"#504945\"},\"link\":{\"default\":\"#076678\"},\"selection\":{\"fg\":\"#3c3836\",\"bg\":\"#d5c4a1\"},\"blockquote\":{\"border\":\"#bdae93\",\"fg\":\"#504945\",\"bg\":\"#ebdbb2\"},\"codeInline\":{\"fg\":\"#8f2f03\",\"bg\":\"#d5c4a1\"},\"codeBlock\":{\"fg\":\"#3c3836\",\"bg\":\"#ebdbb2\"},\"table\":{\"border\":\"#bdae93\",\"stripe\":\"#d5c4a1\",\"theadBg\":\"#ebdbb2\"}},\"components\":{\"card\":{\"bg\":\"#f2e5bc\",\"border\":\"#bdae93\",\"headerBg\":\"#ebdbb2\",\"footerBg\":\"#ebdbb2\"},\"message\":{\"bg\":\"#ebdbb2\",\"headerBg\":\"#f2e5bc\",\"border\":\"#bdae93\",\"bodyFg\":\"#3c3836\"},\"panel\":{\"bg\":\"#f2e5bc\",\"headerBg\":\"#ebdbb2\",\"headerFg\":\"#3c3836\",\"border\":\"#bdae93\",\"blockBg\":\"#ebdbb2\",\"blockHoverBg\":\"#f2e5bc\",\"blockActiveBg\":\"#d5c4a1\"},\"box\":{\"bg\":\"#f2e5bc\",\"border\":\"#bdae93\"},\"notification\":{\"bg\":\"#ebdbb2\",\"border\":\"#bdae93\"},\"modal\":{\"bg\":\"rgba(60, 56, 54, 0.86)\",\"cardBg\":\"#f2e5bc\",\"headerBg\":\"#ebdbb2\",\"footerBg\":\"#ebdbb2\"},\"dropdown\":{\"bg\":\"#f2e5bc\",\"itemHoverBg\":\"#ebdbb2\",\"border\":\"#bdae93\"},\"tabs\":{\"border\":\"#bdae93\",\"linkBg\":\"#ebdbb2\",\"linkActiveBg\":\"#f2e5bc\",\"linkHoverBg\":\"#d5c4a1\"}}}},\"gruvbox-light\":{\"id\":\"gruvbox-light\",\"label\":\"Gruvbox Light\",\"vendor\":\"gruvbox\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#fbf1c7\",\"surface\":\"#ebdbb2\",\"overlay\":\"#d5c4a1\"},\"text\":{\"primary\":\"#3c3836\",\"secondary\":\"#504945\",\"inverse\":\"#fbf1c7\"},\"brand\":{\"primary\":\"#b57614\",\"primaryText\":\"#100f0d\"},\"state\":{\"info\":\"#478e9b\",\"success\":\"#79740e\",\"warning\":\"#b57614\",\"danger\":\"#9d0006\",\"successText\":\"#fefdf5\",\"warningText\":\"#171612\",\"infoText\":\"#171612\",\"dangerText\":\"#fbf1c7\"},\"border\":{\"default\":\"#bdae93\"},\"accent\":{\"link\":\"#076678\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#79740e\",\"h2\":\"#076678\",\"h3\":\"#427b58\",\"h4\":\"#ac7013\",\"h5\":\"#8f3f71\",\"h6\":\"#9d0006\"},\"body\":{\"primary\":\"#3c3836\",\"secondary\":\"#504945\"},\"link\":{\"default\":\"#076678\"},\"selection\":{\"fg\":\"#3c3836\",\"bg\":\"#d5c4a1\"},\"blockquote\":{\"border\":\"#bdae93\",\"fg\":\"#504945\",\"bg\":\"#ebdbb2\"},\"codeInline\":{\"fg\":\"#8f2f03\",\"bg\":\"#d5c4a1\"},\"codeBlock\":{\"fg\":\"#3c3836\",\"bg\":\"#ebdbb2\"},\"table\":{\"border\":\"#bdae93\",\"stripe\":\"#d5c4a1\",\"theadBg\":\"#ebdbb2\"}},\"components\":{\"card\":{\"bg\":\"#fbf1c7\",\"border\":\"#bdae93\",\"headerBg\":\"#ebdbb2\",\"footerBg\":\"#ebdbb2\"},\"message\":{\"bg\":\"#ebdbb2\",\"headerBg\":\"#fbf1c7\",\"border\":\"#bdae93\",\"bodyFg\":\"#3c3836\"},\"panel\":{\"bg\":\"#fbf1c7\",\"headerBg\":\"#ebdbb2\",\"headerFg\":\"#3c3836\",\"border\":\"#bdae93\",\"blockBg\":\"#ebdbb2\",\"blockHoverBg\":\"#fbf1c7\",\"blockActiveBg\":\"#d5c4a1\"},\"box\":{\"bg\":\"#fbf1c7\",\"border\":\"#bdae93\"},\"notification\":{\"bg\":\"#ebdbb2\",\"border\":\"#bdae93\"},\"modal\":{\"bg\":\"rgba(60, 56, 54, 0.86)\",\"cardBg\":\"#fbf1c7\",\"headerBg\":\"#ebdbb2\",\"footerBg\":\"#ebdbb2\"},\"dropdown\":{\"bg\":\"#fbf1c7\",\"itemHoverBg\":\"#ebdbb2\",\"border\":\"#bdae93\"},\"tabs\":{\"border\":\"#bdae93\",\"linkBg\":\"#ebdbb2\",\"linkActiveBg\":\"#fbf1c7\",\"linkHoverBg\":\"#d5c4a1\"}}}},\"kanagawa-dragon\":{\"id\":\"kanagawa-dragon\",\"label\":\"Kanagawa Dragon\",\"vendor\":\"kanagawa\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#181616\",\"surface\":\"#282727\",\"overlay\":\"#393836\"},\"text\":{\"primary\":\"#c5c9c5\",\"secondary\":\"#C8C093\",\"inverse\":\"#181616\"},\"brand\":{\"primary\":\"#8ba4b0\",\"primaryText\":\"#131212\"},\"state\":{\"info\":\"#658594\",\"success\":\"#98BB6C\",\"warning\":\"#FF9E3B\",\"danger\":\"#e82828\",\"dangerText\":\"#000000\",\"infoText\":\"#131212\",\"successText\":\"#181616\",\"warningText\":\"#181616\"},\"border\":{\"default\":\"#54546D\"},\"accent\":{\"link\":\"#8ba4b0\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#8ba4b0\",\"h2\":\"#8992a7\",\"h3\":\"#8ea4a2\",\"h4\":\"#c4b28a\",\"h5\":\"#b6927b\",\"h6\":\"#a292a3\"},\"body\":{\"primary\":\"#c5c9c5\",\"secondary\":\"#C8C093\"},\"link\":{\"default\":\"#8ba4b0\"},\"selection\":{\"fg\":\"#c5c9c5\",\"bg\":\"#393836\"},\"blockquote\":{\"border\":\"#54546D\",\"fg\":\"#C8C093\",\"bg\":\"#282727\"},\"codeInline\":{\"fg\":\"#c4b28a\",\"bg\":\"#393836\"},\"codeBlock\":{\"fg\":\"#c5c9c5\",\"bg\":\"#0d0c0c\"},\"table\":{\"border\":\"#54546D\",\"stripe\":\"#282727\",\"theadBg\":\"#393836\"}}}},\"kanagawa-lotus\":{\"id\":\"kanagawa-lotus\",\"label\":\"Kanagawa Lotus\",\"vendor\":\"kanagawa\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#f2ecbc\",\"surface\":\"#e7dba0\",\"overlay\":\"#e4d794\"},\"text\":{\"primary\":\"#545464\",\"secondary\":\"#43436c\",\"inverse\":\"#f2ecbc\"},\"brand\":{\"primary\":\"#4d699b\",\"primaryText\":\"#fffffe\"},\"state\":{\"info\":\"#5a7785\",\"success\":\"#6f894e\",\"warning\":\"#e98a00\",\"danger\":\"#e82828\",\"warningText\":\"#353429\",\"infoText\":\"#fffffe\",\"successText\":\"#13130f\",\"dangerText\":\"#000000\"},\"border\":{\"default\":\"#716e61\"},\"accent\":{\"link\":\"#435c88\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#4d699b\",\"h2\":\"#624c83\",\"h3\":\"#597b75\",\"h4\":\"#77713f\",\"h5\":\"#bc6400\",\"h6\":\"#b35b79\"},\"body\":{\"primary\":\"#545464\",\"secondary\":\"#43436c\"},\"link\":{\"default\":\"#435c88\"},\"selection\":{\"fg\":\"#545464\",\"bg\":\"#cdcfd4\"},\"blockquote\":{\"border\":\"#716e61\",\"fg\":\"#43436c\",\"bg\":\"#e7dba0\"},\"codeInline\":{\"fg\":\"#624c83\",\"bg\":\"#e4d794\"},\"codeBlock\":{\"fg\":\"#545464\",\"bg\":\"#e4d794\"},\"table\":{\"border\":\"#716e61\",\"stripe\":\"#e7dba0\",\"theadBg\":\"#e4d794\"}}}},\"kanagawa-wave\":{\"id\":\"kanagawa-wave\",\"label\":\"Kanagawa Wave\",\"vendor\":\"kanagawa\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#1F1F28\",\"surface\":\"#2A2A37\",\"overlay\":\"#363646\"},\"text\":{\"primary\":\"#DCD7BA\",\"secondary\":\"#C8C093\",\"inverse\":\"#1F1F28\"},\"brand\":{\"primary\":\"#7E9CD8\",\"primaryText\":\"#111116\"},\"state\":{\"info\":\"#658594\",\"success\":\"#98BB6C\",\"warning\":\"#FF9E3B\",\"danger\":\"#e82828\",\"infoText\":\"#111116\",\"dangerText\":\"#000000\",\"successText\":\"#1F1F28\",\"warningText\":\"#1F1F28\"},\"border\":{\"default\":\"#54546D\"},\"accent\":{\"link\":\"#7E9CD8\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#7E9CD8\",\"h2\":\"#957FB8\",\"h3\":\"#7AA89F\",\"h4\":\"#E6C384\",\"h5\":\"#FFA066\",\"h6\":\"#D27E99\"},\"body\":{\"primary\":\"#DCD7BA\",\"secondary\":\"#C8C093\"},\"link\":{\"default\":\"#7E9CD8\"},\"selection\":{\"fg\":\"#DCD7BA\",\"bg\":\"#223249\"},\"blockquote\":{\"border\":\"#54546D\",\"fg\":\"#C8C093\",\"bg\":\"#2A2A37\"},\"codeInline\":{\"fg\":\"#E6C384\",\"bg\":\"#363646\"},\"codeBlock\":{\"fg\":\"#DCD7BA\",\"bg\":\"#16161D\"},\"table\":{\"border\":\"#54546D\",\"stripe\":\"#2A2A37\",\"theadBg\":\"#363646\"}}}},\"nord\":{\"id\":\"nord\",\"label\":\"Nord\",\"vendor\":\"nord\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#2e3440\",\"surface\":\"#3b4252\",\"overlay\":\"#434c5e\"},\"text\":{\"primary\":\"#eceff4\",\"secondary\":\"#d8dee9\",\"inverse\":\"#2e3440\"},\"brand\":{\"primary\":\"#88c0d0\",\"primaryText\":\"#0d0f13\"},\"state\":{\"info\":\"#5e81ac\",\"success\":\"#a3be8c\",\"warning\":\"#ebcb8b\",\"danger\":\"#bf616a\",\"infoText\":\"#0d0f13\",\"dangerText\":\"#0c0d10\",\"successText\":\"#2e3440\",\"warningText\":\"#2e3440\"},\"border\":{\"default\":\"#4c566a\"},\"accent\":{\"link\":\"#88c0d0\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#8fbcbb\",\"h2\":\"#88c0d0\",\"h3\":\"#81a1c1\",\"h4\":\"#ebcb8b\",\"h5\":\"#d08770\",\"h6\":\"#b48ead\"},\"body\":{\"primary\":\"#eceff4\",\"secondary\":\"#d8dee9\"},\"link\":{\"default\":\"#88c0d0\"},\"selection\":{\"fg\":\"#eceff4\",\"bg\":\"#4c566a\"},\"blockquote\":{\"border\":\"#4c566a\",\"fg\":\"#d8dee9\",\"bg\":\"#3b4252\"},\"codeInline\":{\"fg\":\"#eceff4\",\"bg\":\"#434c5e\"},\"codeBlock\":{\"fg\":\"#eceff4\",\"bg\":\"#434c5e\"},\"table\":{\"border\":\"#4c566a\",\"stripe\":\"#434c5e\",\"theadBg\":\"#3b4252\"}}}},\"one-dark\":{\"id\":\"one-dark\",\"label\":\"One Dark\",\"vendor\":\"one-dark\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#282c34\",\"surface\":\"#2c313a\",\"overlay\":\"#3e4451\"},\"text\":{\"primary\":\"#abb2bf\",\"secondary\":\"#979da9\",\"inverse\":\"#282c34\"},\"brand\":{\"primary\":\"#61afef\",\"primaryText\":\"#282c34\"},\"state\":{\"info\":\"#56b6c2\",\"success\":\"#98c379\",\"warning\":\"#e5c07b\",\"danger\":\"#e06c75\",\"dangerText\":\"#22262d\",\"infoText\":\"#282c34\",\"successText\":\"#282c34\",\"warningText\":\"#282c34\"},\"border\":{\"default\":\"#3e4451\"},\"accent\":{\"link\":\"#61afef\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#61afef\",\"h2\":\"#c678dd\",\"h3\":\"#98c379\",\"h4\":\"#e5c07b\",\"h5\":\"#d19a66\",\"h6\":\"#56b6c2\"},\"body\":{\"primary\":\"#abb2bf\",\"secondary\":\"#979da9\"},\"link\":{\"default\":\"#61afef\"},\"selection\":{\"fg\":\"#abb2bf\",\"bg\":\"#3c414e\"},\"blockquote\":{\"border\":\"#3e4451\",\"fg\":\"#979daa\",\"bg\":\"#2c313a\"},\"codeInline\":{\"fg\":\"#c980df\",\"bg\":\"#2c313a\"},\"codeBlock\":{\"fg\":\"#abb2bf\",\"bg\":\"#21252b\"},\"table\":{\"border\":\"#3e4451\",\"stripe\":\"#2c313a\",\"theadBg\":\"#3e4451\"}}}},\"one-light\":{\"id\":\"one-light\",\"label\":\"One Light\",\"vendor\":\"one-dark\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#fafafa\",\"surface\":\"#f0f0f0\",\"overlay\":\"#e5e5e6\"},\"text\":{\"primary\":\"#383a42\",\"secondary\":\"#666973\",\"inverse\":\"#fafafa\"},\"brand\":{\"primary\":\"#4078f2\",\"primaryText\":\"#080808\"},\"state\":{\"info\":\"#0184bc\",\"success\":\"#50a14f\",\"warning\":\"#c18401\",\"danger\":\"#e45649\",\"infoText\":\"#080808\",\"successText\":\"#232323\",\"warningText\":\"#232323\",\"dangerText\":\"#191919\"},\"border\":{\"default\":\"#d0d0d1\"},\"accent\":{\"link\":\"#3565cb\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#4078f2\",\"h2\":\"#a626a4\",\"h3\":\"#4d9b4c\",\"h4\":\"#b97f01\",\"h5\":\"#986801\",\"h6\":\"#0184bc\"},\"body\":{\"primary\":\"#383a42\",\"secondary\":\"#666973\"},\"link\":{\"default\":\"#3565cb\"},\"selection\":{\"fg\":\"#383a42\",\"bg\":\"#dfe1e5\"},\"blockquote\":{\"border\":\"#d0d0d1\",\"fg\":\"#666973\",\"bg\":\"#f0f0f0\"},\"codeInline\":{\"fg\":\"#a626a4\",\"bg\":\"#e5e5e6\"},\"codeBlock\":{\"fg\":\"#383a42\",\"bg\":\"#e5e5e6\"},\"table\":{\"border\":\"#d0d0d1\",\"stripe\":\"#f0f0f0\",\"theadBg\":\"#e5e5e6\"}}}},\"radix-mauve-dark\":{\"id\":\"radix-mauve-dark\",\"label\":\"Radix Colors Mauve Dark\",\"vendor\":\"radix\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#121113\",\"surface\":\"#1a191b\",\"overlay\":\"#232225\"},\"text\":{\"primary\":\"#eeeef0\",\"secondary\":\"#b5b2bc\",\"inverse\":\"#121113\"},\"brand\":{\"primary\":\"#0090ff\",\"primaryText\":\"#121113\"},\"state\":{\"info\":\"#00a2c7\",\"success\":\"#30a46c\",\"warning\":\"#ffc53d\",\"danger\":\"#e5484d\",\"infoText\":\"#121113\",\"successText\":\"#121113\",\"warningText\":\"#121113\",\"dangerText\":\"#121113\"},\"border\":{\"default\":\"#3c393f\"},\"accent\":{\"link\":\"#70b8ff\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#3dd68c\",\"h2\":\"#70b8ff\",\"h3\":\"#4ccce6\",\"h4\":\"#ffca16\",\"h5\":\"#baa7ff\",\"h6\":\"#ff9592\"},\"body\":{\"primary\":\"#eeeef0\",\"secondary\":\"#b5b2bc\"},\"link\":{\"default\":\"#70b8ff\"},\"selection\":{\"fg\":\"#eeeef0\",\"bg\":\"#323035\"},\"blockquote\":{\"border\":\"#49474e\",\"fg\":\"#eeeef0\",\"bg\":\"#1a191b\"},\"codeInline\":{\"fg\":\"#eeeef0\",\"bg\":\"#232225\"},\"codeBlock\":{\"fg\":\"#eeeef0\",\"bg\":\"#232225\"},\"table\":{\"border\":\"#49474e\",\"stripe\":\"#1a191b\",\"theadBg\":\"#2b292d\"}}}},\"radix-mauve-light\":{\"id\":\"radix-mauve-light\",\"label\":\"Radix Colors Mauve Light\",\"vendor\":\"radix\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#fdfcfd\",\"surface\":\"#faf9fb\",\"overlay\":\"#f2eff3\"},\"text\":{\"primary\":\"#211f26\",\"secondary\":\"#65636d\",\"inverse\":\"#fdfcfd\"},\"brand\":{\"primary\":\"#0090ff\",\"primaryText\":\"#232323\"},\"state\":{\"info\":\"#00a2c7\",\"success\":\"#30a46c\",\"warning\":\"#ffc53d\",\"danger\":\"#e5484d\",\"infoText\":\"#211f26\",\"successText\":\"#211f26\",\"warningText\":\"#211f26\",\"dangerText\":\"#121212\"},\"border\":{\"default\":\"#dbd8e0\"},\"accent\":{\"link\":\"#0c6fc6\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#218358\",\"h2\":\"#0d74ce\",\"h3\":\"#107d98\",\"h4\":\"#ab6400\",\"h5\":\"#6550b9\",\"h6\":\"#ce2c31\"},\"body\":{\"primary\":\"#211f26\",\"secondary\":\"#65636d\"},\"link\":{\"default\":\"#0c6fc6\"},\"selection\":{\"fg\":\"#211f26\",\"bg\":\"#e3dfe6\"},\"blockquote\":{\"border\":\"#d0cdd7\",\"fg\":\"#211f26\",\"bg\":\"#faf9fb\"},\"codeInline\":{\"fg\":\"#211f26\",\"bg\":\"#f2eff3\"},\"codeBlock\":{\"fg\":\"#211f26\",\"bg\":\"#f2eff3\"},\"table\":{\"border\":\"#d0cdd7\",\"stripe\":\"#faf9fb\",\"theadBg\":\"#eae7ec\"}}}},\"radix-slate-dark\":{\"id\":\"radix-slate-dark\",\"label\":\"Radix Colors Slate Dark\",\"vendor\":\"radix\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#111113\",\"surface\":\"#18191b\",\"overlay\":\"#212225\"},\"text\":{\"primary\":\"#edeef0\",\"secondary\":\"#b0b4ba\",\"inverse\":\"#111113\"},\"brand\":{\"primary\":\"#0090ff\",\"primaryText\":\"#111113\"},\"state\":{\"info\":\"#00a2c7\",\"success\":\"#30a46c\",\"warning\":\"#ffc53d\",\"danger\":\"#e5484d\",\"infoText\":\"#111113\",\"successText\":\"#111113\",\"warningText\":\"#111113\",\"dangerText\":\"#111113\"},\"border\":{\"default\":\"#363a3f\"},\"accent\":{\"link\":\"#70b8ff\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#3dd68c\",\"h2\":\"#70b8ff\",\"h3\":\"#4ccce6\",\"h4\":\"#ffca16\",\"h5\":\"#baa7ff\",\"h6\":\"#ff9592\"},\"body\":{\"primary\":\"#edeef0\",\"secondary\":\"#b0b4ba\"},\"link\":{\"default\":\"#70b8ff\"},\"selection\":{\"fg\":\"#edeef0\",\"bg\":\"#2e3135\"},\"blockquote\":{\"border\":\"#43484e\",\"fg\":\"#edeef0\",\"bg\":\"#18191b\"},\"codeInline\":{\"fg\":\"#edeef0\",\"bg\":\"#212225\"},\"codeBlock\":{\"fg\":\"#edeef0\",\"bg\":\"#212225\"},\"table\":{\"border\":\"#43484e\",\"stripe\":\"#18191b\",\"theadBg\":\"#272a2d\"}}}},\"radix-slate-light\":{\"id\":\"radix-slate-light\",\"label\":\"Radix Colors Slate Light\",\"vendor\":\"radix\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#fcfcfd\",\"surface\":\"#f9f9fb\",\"overlay\":\"#f0f0f3\"},\"text\":{\"primary\":\"#1c2024\",\"secondary\":\"#60646c\",\"inverse\":\"#fcfcfd\"},\"brand\":{\"primary\":\"#0090ff\",\"primaryText\":\"#232323\"},\"state\":{\"info\":\"#00a2c7\",\"success\":\"#30a46c\",\"warning\":\"#ffc53d\",\"danger\":\"#e5484d\",\"infoText\":\"#1c2024\",\"successText\":\"#1c2024\",\"warningText\":\"#1c2024\",\"dangerText\":\"#121212\"},\"border\":{\"default\":\"#d9d9e0\"},\"accent\":{\"link\":\"#0c6fc6\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#218358\",\"h2\":\"#0d74ce\",\"h3\":\"#107d98\",\"h4\":\"#ab6400\",\"h5\":\"#6550b9\",\"h6\":\"#ce2c31\"},\"body\":{\"primary\":\"#1c2024\",\"secondary\":\"#60646c\"},\"link\":{\"default\":\"#0c6fc6\"},\"selection\":{\"fg\":\"#1c2024\",\"bg\":\"#e0e1e6\"},\"blockquote\":{\"border\":\"#cdced6\",\"fg\":\"#1c2024\",\"bg\":\"#f9f9fb\"},\"codeInline\":{\"fg\":\"#1c2024\",\"bg\":\"#f0f0f3\"},\"codeBlock\":{\"fg\":\"#1c2024\",\"bg\":\"#f0f0f3\"},\"table\":{\"border\":\"#cdced6\",\"stripe\":\"#f9f9fb\",\"theadBg\":\"#e8e8ec\"}}}},\"rose-pine-dawn\":{\"id\":\"rose-pine-dawn\",\"label\":\"Rosé Pine Dawn\",\"vendor\":\"rose-pine\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#faf4ed\",\"surface\":\"#fffaf3\",\"overlay\":\"#f2e9e1\"},\"text\":{\"primary\":\"#575279\",\"secondary\":\"#6d6984\",\"inverse\":\"#faf4ed\"},\"brand\":{\"primary\":\"#907aa9\",\"primaryText\":\"#171615\"},\"state\":{\"info\":\"#56949f\",\"success\":\"#286983\",\"warning\":\"#ea9d34\",\"danger\":\"#b4637a\",\"warningText\":\"#3f3d3b\",\"infoText\":\"#1e1d1c\",\"dangerText\":\"#080707\",\"successText\":\"#faf4ed\"},\"border\":{\"default\":\"#dfdad9\"},\"accent\":{\"link\":\"#76658c\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#286983\",\"h2\":\"#907aa9\",\"h3\":\"#56949f\",\"h4\":\"#be7f2a\",\"h5\":\"#c67874\",\"h6\":\"#b4637a\"},\"body\":{\"primary\":\"#575279\",\"secondary\":\"#6d6984\"},\"link\":{\"default\":\"#76658c\"},\"selection\":{\"fg\":\"#575279\",\"bg\":\"#d2d1d2\"},\"blockquote\":{\"border\":\"#cecacd\",\"fg\":\"#575279\",\"bg\":\"#fffaf3\"},\"codeInline\":{\"fg\":\"#575279\",\"bg\":\"#f2e9e1\"},\"codeBlock\":{\"fg\":\"#575279\",\"bg\":\"#f2e9e1\"},\"table\":{\"border\":\"#cecacd\",\"stripe\":\"#f2e9e1\",\"theadBg\":\"#dfdad9\"}}}},\"rose-pine-moon\":{\"id\":\"rose-pine-moon\",\"label\":\"Rosé Pine Moon\",\"vendor\":\"rose-pine\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#232136\",\"surface\":\"#2a273f\",\"overlay\":\"#393552\"},\"text\":{\"primary\":\"#e0def4\",\"secondary\":\"#9591ae\",\"inverse\":\"#232136\"},\"brand\":{\"primary\":\"#c4a7e7\",\"primaryText\":\"#232136\"},\"state\":{\"info\":\"#9ccfd8\",\"success\":\"#3e8fb0\",\"warning\":\"#f6c177\",\"danger\":\"#eb6f92\",\"successText\":\"#1a1828\",\"infoText\":\"#232136\",\"warningText\":\"#232136\",\"dangerText\":\"#232136\"},\"border\":{\"default\":\"#44415a\"},\"accent\":{\"link\":\"#c4a7e7\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#3e8fb0\",\"h2\":\"#c4a7e7\",\"h3\":\"#9ccfd8\",\"h4\":\"#f6c177\",\"h5\":\"#ea9a97\",\"h6\":\"#eb6f92\"},\"body\":{\"primary\":\"#e0def4\",\"secondary\":\"#9591ae\"},\"link\":{\"default\":\"#c4a7e7\"},\"selection\":{\"fg\":\"#e0def4\",\"bg\":\"#56526e\"},\"blockquote\":{\"border\":\"#56526e\",\"fg\":\"#e0def4\",\"bg\":\"#2a273f\"},\"codeInline\":{\"fg\":\"#e0def4\",\"bg\":\"#393552\"},\"codeBlock\":{\"fg\":\"#e0def4\",\"bg\":\"#393552\"},\"table\":{\"border\":\"#56526e\",\"stripe\":\"#393552\",\"theadBg\":\"#44415a\"}}}},\"rose-pine\":{\"id\":\"rose-pine\",\"label\":\"Rosé Pine\",\"vendor\":\"rose-pine\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#191724\",\"surface\":\"#1f1d2e\",\"overlay\":\"#26233a\"},\"text\":{\"primary\":\"#e0def4\",\"secondary\":\"#908caa\",\"inverse\":\"#191724\"},\"brand\":{\"primary\":\"#c4a7e7\",\"primaryText\":\"#191724\"},\"state\":{\"info\":\"#9ccfd8\",\"success\":\"#31748f\",\"warning\":\"#f6c177\",\"danger\":\"#eb6f92\",\"successText\":\"#f6f6f6\",\"infoText\":\"#191724\",\"warningText\":\"#191724\",\"dangerText\":\"#191724\"},\"border\":{\"default\":\"#403d52\"},\"accent\":{\"link\":\"#c4a7e7\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#31748f\",\"h2\":\"#c4a7e7\",\"h3\":\"#9ccfd8\",\"h4\":\"#f6c177\",\"h5\":\"#ebbcba\",\"h6\":\"#eb6f92\"},\"body\":{\"primary\":\"#e0def4\",\"secondary\":\"#908caa\"},\"link\":{\"default\":\"#c4a7e7\"},\"selection\":{\"fg\":\"#e0def4\",\"bg\":\"#524f67\"},\"blockquote\":{\"border\":\"#524f67\",\"fg\":\"#e0def4\",\"bg\":\"#1f1d2e\"},\"codeInline\":{\"fg\":\"#e0def4\",\"bg\":\"#26233a\"},\"codeBlock\":{\"fg\":\"#e0def4\",\"bg\":\"#26233a\"},\"table\":{\"border\":\"#524f67\",\"stripe\":\"#26233a\",\"theadBg\":\"#403d52\"}}}},\"solarized-dark\":{\"id\":\"solarized-dark\",\"label\":\"Solarized Dark\",\"vendor\":\"solarized\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#002b36\",\"surface\":\"#073642\",\"overlay\":\"#586e75\"},\"text\":{\"primary\":\"#90a0a1\",\"secondary\":\"#91a0a6\",\"inverse\":\"#002b36\"},\"brand\":{\"primary\":\"#268bd2\",\"primaryText\":\"#001d24\"},\"state\":{\"info\":\"#2aa198\",\"success\":\"#859900\",\"warning\":\"#b58900\",\"danger\":\"#d8312e\",\"dangerText\":\"#ffffff\",\"infoText\":\"#002b36\",\"successText\":\"#002934\",\"warningText\":\"#002934\"},\"border\":{\"default\":\"#586e75\"},\"accent\":{\"link\":\"#54a4db\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#268bd2\",\"h2\":\"#2aa198\",\"h3\":\"#859900\",\"h4\":\"#b58900\",\"h5\":\"#ce5422\",\"h6\":\"#d53e87\"},\"body\":{\"primary\":\"#90a0a1\",\"secondary\":\"#91a0a6\"},\"link\":{\"default\":\"#54a4db\"},\"selection\":{\"fg\":\"#fdf6e3\",\"bg\":\"#586e75\"},\"blockquote\":{\"border\":\"#657b83\",\"fg\":\"#92a0a2\",\"bg\":\"#073642\"},\"codeInline\":{\"fg\":\"#43aca4\",\"bg\":\"#073642\"},\"codeBlock\":{\"fg\":\"#93a1a1\",\"bg\":\"#073642\"},\"table\":{\"border\":\"#586e75\",\"stripe\":\"#073642\",\"theadBg\":\"#586e75\"}},\"components\":{\"card\":{\"bg\":\"#073642\",\"border\":\"#586e75\",\"headerBg\":\"#002b36\",\"footerBg\":\"#073642\"},\"message\":{\"bg\":\"#002b36\",\"headerBg\":\"#073642\",\"border\":\"#586e75\",\"bodyFg\":\"#839496\"},\"panel\":{\"bg\":\"#073642\",\"headerBg\":\"#002b36\",\"headerFg\":\"#93a1a1\",\"border\":\"#586e75\",\"blockBg\":\"#002b36\",\"blockHoverBg\":\"#073642\",\"blockActiveBg\":\"#586e75\"},\"box\":{\"bg\":\"#073642\",\"border\":\"#586e75\"},\"notification\":{\"bg\":\"#002b36\",\"border\":\"#586e75\"},\"modal\":{\"bg\":\"rgba(0, 43, 54, 0.9)\",\"cardBg\":\"#073642\",\"headerBg\":\"#002b36\",\"footerBg\":\"#073642\"},\"dropdown\":{\"bg\":\"#073642\",\"itemHoverBg\":\"#586e75\",\"border\":\"#586e75\"},\"tabs\":{\"border\":\"#586e75\",\"linkBg\":\"#073642\",\"linkActiveBg\":\"#002b36\",\"linkHoverBg\":\"#586e75\"}}}},\"solarized-light\":{\"id\":\"solarized-light\",\"label\":\"Solarized Light\",\"vendor\":\"solarized\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#fdf6e3\",\"surface\":\"#eee8d5\",\"overlay\":\"#93a1a1\"},\"text\":{\"primary\":\"#52686e\",\"secondary\":\"#54686e\",\"inverse\":\"#fdf6e3\"},\"brand\":{\"primary\":\"#268bd2\",\"primaryText\":\"#191917\"},\"state\":{\"info\":\"#2aa198\",\"success\":\"#859900\",\"warning\":\"#b58900\",\"danger\":\"#d8312e\",\"infoText\":\"#262522\",\"successText\":\"#262522\",\"warningText\":\"#262522\",\"dangerText\":\"#fffffe\"},\"border\":{\"default\":\"#93a1a1\"},\"accent\":{\"link\":\"#1c699e\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#268bd2\",\"h2\":\"#26938b\",\"h3\":\"#7b8c00\",\"h4\":\"#a67e00\",\"h5\":\"#cb4b16\",\"h6\":\"#d33682\"},\"body\":{\"primary\":\"#52686e\",\"secondary\":\"#54686e\"},\"link\":{\"default\":\"#1c699e\"},\"selection\":{\"fg\":\"#002b36\",\"bg\":\"#93a1a1\"},\"blockquote\":{\"border\":\"#93a1a1\",\"fg\":\"#55686f\",\"bg\":\"#eee8d5\"},\"codeInline\":{\"fg\":\"#5a5ea4\",\"bg\":\"#eee8d5\"},\"codeBlock\":{\"fg\":\"#073642\",\"bg\":\"#eee8d5\"},\"table\":{\"border\":\"#93a1a1\",\"stripe\":\"#eee8d5\",\"theadBg\":\"#eee8d5\"}},\"components\":{\"card\":{\"bg\":\"#fdf6e3\",\"border\":\"#93a1a1\",\"headerBg\":\"#eee8d5\",\"footerBg\":\"#eee8d5\"},\"message\":{\"bg\":\"#eee8d5\",\"headerBg\":\"#fdf6e3\",\"border\":\"#93a1a1\",\"bodyFg\":\"#586e75\"},\"panel\":{\"bg\":\"#fdf6e3\",\"headerBg\":\"#eee8d5\",\"headerFg\":\"#073642\",\"border\":\"#93a1a1\",\"blockBg\":\"#eee8d5\",\"blockHoverBg\":\"#fdf6e3\",\"blockActiveBg\":\"#93a1a1\"},\"box\":{\"bg\":\"#fdf6e3\",\"border\":\"#93a1a1\"},\"notification\":{\"bg\":\"#eee8d5\",\"border\":\"#93a1a1\"},\"modal\":{\"bg\":\"rgba(0, 43, 54, 0.86)\",\"cardBg\":\"#fdf6e3\",\"headerBg\":\"#eee8d5\",\"footerBg\":\"#eee8d5\"},\"dropdown\":{\"bg\":\"#fdf6e3\",\"itemHoverBg\":\"#eee8d5\",\"border\":\"#93a1a1\"},\"tabs\":{\"border\":\"#93a1a1\",\"linkBg\":\"#eee8d5\",\"linkActiveBg\":\"#fdf6e3\",\"linkHoverBg\":\"#93a1a1\"}}}},\"terminal\":{\"id\":\"terminal\",\"label\":\"Terminal\",\"vendor\":\"turbo\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#0d0d0d\",\"surface\":\"#080808\",\"overlay\":\"#111111\"},\"text\":{\"primary\":\"#c8ffc8\",\"secondary\":\"#8fbc8f\",\"inverse\":\"#0d0d0d\"},\"brand\":{\"primary\":\"#39ff14\",\"primaryText\":\"#0d0d0d\"},\"state\":{\"info\":\"#7dd3fc\",\"success\":\"#39ff14\",\"warning\":\"#ffb000\",\"danger\":\"#ff4444\",\"infoText\":\"#0d0d0d\",\"successText\":\"#0d0d0d\",\"warningText\":\"#0d0d0d\",\"dangerText\":\"#0d0d0d\"},\"border\":{\"default\":\"#1f3d1f\"},\"accent\":{\"link\":\"#7dd3fc\"},\"typography\":{\"fonts\":{\"sans\":\"\\\"IBM Plex Mono\\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\",\"mono\":\"\\\"IBM Plex Mono\\\", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#39ff14\",\"h2\":\"#7dd3fc\",\"h3\":\"#ffb000\",\"h4\":\"#39ff14\",\"h5\":\"#8fbc8f\",\"h6\":\"#c8ffc8\"},\"body\":{\"primary\":\"#c8ffc8\",\"secondary\":\"#8fbc8f\"},\"link\":{\"default\":\"#7dd3fc\"},\"selection\":{\"fg\":\"#0d0d0d\",\"bg\":\"#39ff14\"},\"blockquote\":{\"border\":\"#39ff14\",\"fg\":\"#8fbc8f\",\"bg\":\"#111111\"},\"codeInline\":{\"fg\":\"#ffb000\",\"bg\":\"#111111\"},\"codeBlock\":{\"fg\":\"#c8ffc8\",\"bg\":\"#080808\"},\"table\":{\"border\":\"#1f3d1f\",\"stripe\":\"#111111\",\"theadBg\":\"#080808\",\"headerFg\":\"#c8ffc8\"}}}},\"tokyo-night-dark\":{\"id\":\"tokyo-night-dark\",\"label\":\"Tokyo Night Dark\",\"vendor\":\"tokyo-night\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#1a1b26\",\"surface\":\"#24283b\",\"overlay\":\"#28344a\"},\"text\":{\"primary\":\"#c0caf5\",\"secondary\":\"#a9b1d6\",\"inverse\":\"#1a1b26\"},\"brand\":{\"primary\":\"#7aa2f7\",\"primaryText\":\"#1a1b26\"},\"state\":{\"info\":\"#7dcfff\",\"success\":\"#9ece6a\",\"warning\":\"#e0af68\",\"danger\":\"#f7768e\",\"infoText\":\"#1a1b26\",\"successText\":\"#1a1b26\",\"warningText\":\"#1a1b26\",\"dangerText\":\"#1a1b26\"},\"border\":{\"default\":\"#565f89\"},\"accent\":{\"link\":\"#7aa2f7\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#7aa2f7\",\"h2\":\"#bb9af7\",\"h3\":\"#7dcfff\",\"h4\":\"#e0af68\",\"h5\":\"#ff9e64\",\"h6\":\"#f7768e\"},\"body\":{\"primary\":\"#c0caf5\",\"secondary\":\"#a9b1d6\"},\"link\":{\"default\":\"#7aa2f7\"},\"selection\":{\"fg\":\"#c0caf5\",\"bg\":\"#28344a\"},\"blockquote\":{\"border\":\"#565f89\",\"fg\":\"#a9b1d6\",\"bg\":\"#24283b\"},\"codeInline\":{\"fg\":\"#c0caf5\",\"bg\":\"#28344a\"},\"codeBlock\":{\"fg\":\"#c0caf5\",\"bg\":\"#28344a\"},\"table\":{\"border\":\"#565f89\",\"stripe\":\"#24283b\",\"theadBg\":\"#28344a\"}}}},\"tokyo-night-light\":{\"id\":\"tokyo-night-light\",\"label\":\"Tokyo Night Light\",\"vendor\":\"tokyo-night\",\"appearance\":\"light\",\"tokens\":{\"background\":{\"base\":\"#e6e7ed\",\"surface\":\"#d5d6dc\",\"overlay\":\"#c8d3f5\"},\"text\":{\"primary\":\"#343b58\",\"secondary\":\"#40434f\",\"inverse\":\"#e6e7ed\"},\"brand\":{\"primary\":\"#2e7de9\",\"primaryText\":\"#0b0b0b\"},\"state\":{\"info\":\"#0089a5\",\"success\":\"#31876d\",\"warning\":\"#8c6c3e\",\"danger\":\"#d81159\",\"infoText\":\"#0c0c0c\",\"successText\":\"#020202\",\"warningText\":\"#fdfdfd\",\"dangerText\":\"#f7f8f9\"},\"border\":{\"default\":\"#b0b4ca\"},\"accent\":{\"link\":\"#2159a5\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#2c77dd\",\"h2\":\"#7847bd\",\"h3\":\"#00849e\",\"h4\":\"#8c6c3e\",\"h5\":\"#bc5e3b\",\"h6\":\"#d81159\"},\"body\":{\"primary\":\"#343b58\",\"secondary\":\"#40434f\"},\"link\":{\"default\":\"#2159a5\"},\"selection\":{\"fg\":\"#343b58\",\"bg\":\"#c8d3f5\"},\"blockquote\":{\"border\":\"#b0b4ca\",\"fg\":\"#40434f\",\"bg\":\"#e6e7ed\"},\"codeInline\":{\"fg\":\"#343b58\",\"bg\":\"#c8d3f5\"},\"codeBlock\":{\"fg\":\"#343b58\",\"bg\":\"#c8d3f5\"},\"table\":{\"border\":\"#b0b4ca\",\"stripe\":\"#e6e7ed\",\"theadBg\":\"#c8d3f5\"}}}},\"tokyo-night-storm\":{\"id\":\"tokyo-night-storm\",\"label\":\"Tokyo Night Storm\",\"vendor\":\"tokyo-night\",\"appearance\":\"dark\",\"tokens\":{\"background\":{\"base\":\"#24283b\",\"surface\":\"#28344a\",\"overlay\":\"#565f89\"},\"text\":{\"primary\":\"#c0caf5\",\"secondary\":\"#a9b1d6\",\"inverse\":\"#24283b\"},\"brand\":{\"primary\":\"#7aa2f7\",\"primaryText\":\"#24283b\"},\"state\":{\"info\":\"#7dcfff\",\"success\":\"#9ece6a\",\"warning\":\"#e0af68\",\"danger\":\"#f7768e\",\"infoText\":\"#24283b\",\"successText\":\"#24283b\",\"warningText\":\"#24283b\",\"dangerText\":\"#24283b\"},\"border\":{\"default\":\"#565f89\"},\"accent\":{\"link\":\"#7aa2f7\"},\"typography\":{\"fonts\":{\"sans\":\"Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, \\\"Apple Color Emoji\\\", \\\"Segoe UI Emoji\\\"\",\"mono\":\"JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\\"Liberation Mono\\\", \\\"Courier New\\\", monospace\"},\"webFonts\":[\"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap\",\"https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap\"]},\"content\":{\"heading\":{\"h1\":\"#7aa2f7\",\"h2\":\"#bb9af7\",\"h3\":\"#7dcfff\",\"h4\":\"#e0af68\",\"h5\":\"#ff9e64\",\"h6\":\"#f7768e\"},\"body\":{\"primary\":\"#c0caf5\",\"secondary\":\"#a9b1d6\"},\"link\":{\"default\":\"#7aa2f7\"},\"selection\":{\"fg\":\"#c0caf5\",\"bg\":\"#28344a\"},\"blockquote\":{\"border\":\"#565f89\",\"fg\":\"#a9b1d6\",\"bg\":\"#28344a\"},\"codeInline\":{\"fg\":\"#c0caf5\",\"bg\":\"#28344a\"},\"codeBlock\":{\"fg\":\"#c0caf5\",\"bg\":\"#28344a\"},\"table\":{\"border\":\"#565f89\",\"stripe\":\"#28344a\",\"theadBg\":\"#28344a\"}}}}}"),
		byVendor: {
			"ayu": {
				"name": "Ayu",
				"homepage": "https://github.com/ayu-theme",
				"themes": [
					"ayu-dark",
					"ayu-light",
					"ayu-mirage"
				]
			},
			"bulma": {
				"name": "Bulma",
				"homepage": "https://bulma.io/",
				"themes": ["bulma-dark", "bulma-light"]
			},
			"catppuccin": {
				"name": "Catppuccin (synced)",
				"homepage": "https://catppuccin.com/palette/",
				"themes": [
					"catppuccin-frappe",
					"catppuccin-latte",
					"catppuccin-macchiato",
					"catppuccin-mocha"
				]
			},
			"dracula": {
				"name": "Dracula",
				"homepage": "https://draculatheme.com/",
				"themes": ["dracula"]
			},
			"everforest": {
				"name": "Everforest",
				"homepage": "https://github.com/sainnhe/everforest",
				"themes": [
					"everforest-dark-hard",
					"everforest-dark-soft",
					"everforest-dark",
					"everforest-light-hard",
					"everforest-light-soft",
					"everforest-light"
				]
			},
			"github": {
				"name": "GitHub (synced)",
				"homepage": "https://primer.style/",
				"themes": ["github-dark", "github-light"]
			},
			"gruvbox": {
				"name": "Gruvbox",
				"homepage": "https://github.com/morhetz/gruvbox",
				"themes": [
					"gruvbox-dark-hard",
					"gruvbox-dark-soft",
					"gruvbox-dark",
					"gruvbox-light-hard",
					"gruvbox-light-soft",
					"gruvbox-light"
				]
			},
			"kanagawa": {
				"name": "Kanagawa",
				"homepage": "https://github.com/rebelot/kanagawa.nvim",
				"themes": [
					"kanagawa-dragon",
					"kanagawa-lotus",
					"kanagawa-wave"
				]
			},
			"nord": {
				"name": "Nord",
				"homepage": "https://www.nordtheme.com/",
				"themes": ["nord"]
			},
			"one-dark": {
				"name": "One",
				"homepage": "https://github.com/Binaryify/OneDark-Pro",
				"themes": ["one-dark", "one-light"]
			},
			"radix": {
				"name": "Radix Colors (synced)",
				"homepage": "https://www.radix-ui.com/colors",
				"themes": [
					"radix-mauve-dark",
					"radix-mauve-light",
					"radix-slate-dark",
					"radix-slate-light"
				]
			},
			"rose-pine": {
				"name": "Rosé Pine (synced)",
				"homepage": "https://rosepinetheme.com/",
				"themes": [
					"rose-pine-dawn",
					"rose-pine-moon",
					"rose-pine"
				]
			},
			"solarized": {
				"name": "Solarized",
				"homepage": "https://ethanschoonover.com/solarized/",
				"themes": ["solarized-dark", "solarized-light"]
			},
			"turbo": {
				"name": "Terminal",
				"homepage": "https://github.com/lgtm-hq/turbo-themes",
				"themes": ["terminal"]
			},
			"tokyo-night": {
				"name": "Tokyo Night",
				"homepage": "https://github.com/enkia/tokyo-night-vscode-theme",
				"themes": [
					"tokyo-night-dark",
					"tokyo-night-light",
					"tokyo-night-storm"
				]
			}
		}
	};
	/**
	* All available theme flavors as a flat array
	*/
	var flavors = Object.values(tokens.themes).map((theme) => ({
		id: theme.id,
		label: theme.label,
		vendor: theme.vendor,
		appearance: theme.appearance,
		...theme.iconUrl !== void 0 && { iconUrl: theme.iconUrl },
		tokens: theme.tokens
	}));
	/**
	* Theme flavors indexed by ID for quick lookup
	*/
	var themesById = /*#__PURE__*/ Object.fromEntries(flavors.map((flavor) => [flavor.id, flavor]));
	/**
	* All available theme packages (grouped by vendor)
	*/
	var packages = /*#__PURE__*/ Object.fromEntries(Object.entries(tokens.byVendor).map(([vendorId, vendor]) => [vendorId, {
		id: vendorId,
		name: vendor.name,
		homepage: vendor.homepage,
		flavors: vendor.themes.map((themeId) => themesById[themeId]).filter(Boolean)
	}]));
	/**
	* List of all available theme IDs
	*/
	var themeIds = /*#__PURE__*/ flavors.map((f) => f.id);
	[...new Set(flavors.map((f) => f.vendor))];
	//#endregion
	//#region packages/core/dist/themes/generated/metadata.js
	/**
	* Ordered list of vendor IDs controlling display order in dropdowns.
	* Source: schema/tokens/_vendors.json
	*/
	var VENDOR_ORDER$1 = [
		"catppuccin",
		"dracula",
		"everforest",
		"gruvbox",
		"github",
		"bulma",
		"nord",
		"radix",
		"solarized",
		"rose-pine",
		"tokyo-night",
		"kanagawa",
		"one-dark",
		"ayu",
		"turbo"
	];
	//#endregion
	//#region packages/core/dist/themes/metadata.js
	/**
	* Consolidated theme metadata derived from tokens.json.
	*
	* All display metadata (names, appearances, vendor groups) is computed from
	* the canonical token data at module evaluation time. Consumers should import
	* from here instead of maintaining their own hardcoded copies.
	*
	* Vendor order and ThemeId come from build-time codegen
	* (`packages/core/src/themes/generated/metadata.ts`).
	*/
	/** Default theme applied when no preference is stored. */
	var DEFAULT_THEME$1 = "catppuccin-mocha";
	flavors.map((f) => [f.id, f.label]);
	/** Appearance (light/dark) for each theme. */
	var THEME_APPEARANCES = /*#__PURE__*/ Object.fromEntries(flavors.map((f) => [f.id, f.appearance]));
	/**
	* Ordered list of vendor IDs controlling display order in dropdowns.
	* Generated from schema/tokens/_vendors.json — do not edit by hand.
	*/
	var VENDOR_ORDER = VENDOR_ORDER$1;
	var _missingFromOrder = Object.keys(packages).filter((id) => !VENDOR_ORDER.includes(id));
	if (_missingFromOrder.length > 0) console.warn(`[metadata] VENDOR_ORDER is missing vendor IDs present in packages: ${_missingFromOrder.join(", ")}. Append them to schema/tokens/_vendors.json and regenerate metadata.`);
	var VENDOR_GROUPS = /*#__PURE__*/ VENDOR_ORDER.filter((id) => id in packages).map((id) => {
		const pkg = packages[id];
		return {
			id,
			displayName: pkg.name.replace(/\s*\(synced\)\s*/i, ""),
			themeIds: pkg.flavors.flatMap((f) => f ? [f.id] : [])
		};
	});
	/** O(1) flavor lookup by ID, built once at module evaluation time. */
	var flavorById = /*#__PURE__*/ new Map(flavors.map((f) => [f.id, f]));
	/** Cache for computed short labels. */
	var shortLabelCache = /* @__PURE__ */ new Map();
	/**
	* Strip the vendor prefix from a theme label to produce a short label.
	*
	* For single-flavor vendors (e.g., "Dracula", "Nord") the full label is returned.
	* For multi-flavor vendors the vendor name prefix is stripped:
	*   "Catppuccin Mocha" -> "Mocha"
	*   "Gruvbox Dark Hard" -> "Dark Hard"
	*
	* @param themeId - A valid theme ID
	* @returns The short display label, or the full label if the theme is not found
	*/
	function getShortLabel(themeId) {
		const cached = shortLabelCache.get(themeId);
		if (cached !== void 0) return cached;
		const flavor = flavorById.get(themeId);
		if (!flavor) return themeId;
		const vendorPkg = packages[flavor.vendor];
		if (!vendorPkg) {
			shortLabelCache.set(themeId, flavor.label);
			return flavor.label;
		}
		if (vendorPkg.flavors.length === 1) {
			shortLabelCache.set(themeId, flavor.label);
			return flavor.label;
		}
		const displayName = vendorPkg.name.replace(/\s*\(synced\)\s*/i, "").normalize("NFC");
		const label = flavor.label;
		let result;
		if (label.normalize("NFC").toLowerCase().startsWith(displayName.toLowerCase())) result = label.slice(displayName.length).trim() || label;
		else result = label;
		shortLabelCache.set(themeId, result);
		return result;
	}
	flavors.map((f) => [f.id, getShortLabel(f.id)]);
	//#endregion
	//#region packages/core/dist/catalog/create.js
	/**
	* Consumer theme curation API.
	*
	* `createThemeCatalog()` provides a single, composable surface for selecting a
	* subset of themes. It composes with the existing `flavors` (tokens) and
	* `VENDOR_GROUPS` (metadata) so consumers no longer need to hand-slice arrays.
	*
	* Filter precedence:
	*   all themes -> vendors/appearances -> include -> exclude
	*
	* Invalid IDs supplied to `include`/`exclude` warn in development (never
	* throw), so a typo cannot silently drop or duplicate a theme.
	*/
	var KNOWN_THEME_IDS = new Set(themeIds);
	/**
	* Emit a dev-time warning for unknown IDs. The `typeof` guard is safe even
	* when `process` is an undeclared identifier (browsers/workers without a
	* shim), and keeps the contiguous `process.env.NODE_ENV` token sequence so
	* bundler define-replacement and dead-code elimination still apply.
	*/
	function warnInvalidIds(source, ids) {
		if (ids.length === 0) return;
		if (typeof process !== "undefined" && process.env.NODE_ENV === "production") return;
		console.warn(`[catalog] createThemeCatalog: ignoring unknown ${source} theme ID(s): ${ids.join(", ")}. Valid IDs come from the exported \`themeIds\`.`);
	}
	/**
	* Build a curated {@link ThemeCatalog} from the full theme set.
	*
	* @param options - Vendor/appearance filters plus explicit include/exclude IDs.
	* @returns A catalog exposing `themeIds`, `flavors`, and `vendorGroups`.
	*/
	function createThemeCatalog(options = {}) {
		const { vendors, appearances, include = [], exclude = [] } = options;
		const selected = /* @__PURE__ */ new Set();
		for (const flavor of flavors) {
			if (vendors !== void 0 && !vendors.includes(flavor.vendor)) continue;
			if (appearances !== void 0 && !appearances.includes(flavor.appearance)) continue;
			selected.add(flavor.id);
		}
		const invalidInclude = [];
		for (const id of include) if (KNOWN_THEME_IDS.has(id)) selected.add(id);
		else invalidInclude.push(id);
		warnInvalidIds("include", invalidInclude);
		const invalidExclude = [];
		for (const id of exclude) if (KNOWN_THEME_IDS.has(id)) selected.delete(id);
		else invalidExclude.push(id);
		warnInvalidIds("exclude", invalidExclude);
		const selectedFlavors = flavors.filter((flavor) => selected.has(flavor.id));
		return {
			themeIds: selectedFlavors.map((flavor) => flavor.id),
			flavors: selectedFlavors,
			vendorGroups: VENDOR_GROUPS.map((group) => ({
				...group,
				themeIds: group.themeIds.filter((id) => selected.has(id))
			})).filter((group) => group.themeIds.length > 0)
		};
	}
	//#endregion
	//#region packages/core/dist/catalog/sets.js
	/**
	* Named theme presets built on top of {@link createThemeCatalog}.
	*
	* These provide opinionated defaults so consumers don't rebuild the same
	* "minimal" or "dark-only" lists in every app. Per-vendor sets are derived
	* from the `packages` keys, so new vendor variants appear automatically on
	* upgrade for opted-in vendors.
	*/
	/**
	* The curated "minimal" starter set: one light + one dark theme from the two
	* most common vendors.
	*/
	var MINIMAL_THEME_IDS = [
		"catppuccin-mocha",
		"catppuccin-latte",
		"github-light",
		"github-dark"
	];
	({ ...Object.fromEntries(Object.keys(packages).map((vendor) => [vendor, createThemeCatalog({ vendors: [vendor] })])) }), createThemeCatalog({
		vendors: [],
		include: MINIMAL_THEME_IDS
	}), createThemeCatalog({ appearances: ["dark"] }), createThemeCatalog({ appearances: ["light"] });
	//#endregion
	//#region packages/theme-selector/src/appearance.ts
	/**
	* Theme appearance (light/dark) resolution for DOM attributes.
	*/
	/**
	* Resolves light/dark appearance for a theme ID.
	*
	* Falls back to `'dark'` when the theme is unknown (e.g. custom themes without
	* an explicit mapping).
	*/
	function resolveThemeAppearance(themeId, appearances = THEME_APPEARANCES) {
		return appearances[themeId] ?? "dark";
	}
	//#endregion
	//#region packages/theme-selector/src/generated/theme-maps.ts
	/** Family display metadata keyed by ThemeFamily. */
	var THEME_FAMILIES$1 = {
		"catppuccin": {
			"name": "Catppuccin",
			"description": "Soothing pastel themes"
		},
		"dracula": {
			"name": "Dracula",
			"description": "Dark vampire aesthetic"
		},
		"everforest": {
			"name": "Everforest",
			"description": "Green-based, nature-inspired palette designed for eye comfort"
		},
		"gruvbox": {
			"name": "Gruvbox",
			"description": "Retro groove palette with warm, earthy tones"
		},
		"github": {
			"name": "GitHub",
			"description": "GitHub-inspired themes"
		},
		"bulma": {
			"name": "Bulma",
			"description": "Classic Bulma themes"
		},
		"nord": {
			"name": "Nord",
			"description": "Arctic, north-bluish color palette"
		},
		"radix": {
			"name": "Radix Colors",
			"description": "Accessibility-focused color system with comprehensive scales"
		},
		"solarized": {
			"name": "Solarized",
			"description": "Precision-balanced light and dark modes"
		},
		"rose-pine": {
			"name": "Rosé Pine",
			"description": "All natural pine, faux fur and a bit of soho vibes"
		},
		"tokyo-night": {
			"name": "Tokyo Night",
			"description": "Neon-infused nightscape with crisp contrast"
		},
		"kanagawa": {
			"name": "Kanagawa",
			"description": "Japanese-inspired palette drawn from The Great Wave off Kanagawa"
		},
		"one-dark": {
			"name": "One",
			"description": "The iconic Atom editor palette in dark and light"
		},
		"ayu": {
			"name": "Ayu",
			"description": "Bright colors designed for comfortable all-day coding"
		},
		"turbo": {
			"name": "Terminal",
			"description": "CRT phosphor green on void"
		}
	};
	/** Vendor to family mapping. */
	var VENDOR_FAMILY_MAP = {
		"catppuccin": "catppuccin",
		"dracula": "dracula",
		"everforest": "everforest",
		"gruvbox": "gruvbox",
		"github": "github",
		"bulma": "bulma",
		"nord": "nord",
		"radix": "radix",
		"solarized": "solarized",
		"rose-pine": "rose-pine",
		"tokyo-night": "tokyo-night",
		"kanagawa": "kanagawa",
		"one-dark": "one-dark",
		"ayu": "ayu",
		"turbo": "turbo"
	};
	/** Vendor icon paths relative to the published package root (assets/img/...). */
	var VENDOR_ICON_MAP = {
		"catppuccin": {
			"light": "assets/img/catppuccin-logo-latte.png",
			"dark": "assets/img/catppuccin-logo-macchiato.png"
		},
		"dracula": "assets/img/dracula-logo.png",
		"everforest": {
			"light": "assets/img/everforest-light.png",
			"dark": "assets/img/everforest-dark.png"
		},
		"gruvbox": {
			"light": "assets/img/gruvbox-light.png",
			"dark": "assets/img/gruvbox-dark.png"
		},
		"github": {
			"light": "assets/img/github-logo-light.png",
			"dark": "assets/img/github-logo-dark.png"
		},
		"bulma": {
			"light": "assets/img/bulma-logo.png",
			"dark": "assets/img/bulma-logo-dark.png"
		},
		"nord": "assets/img/nord.png",
		"radix": {
			"light": "assets/img/radix-slate-light.png",
			"dark": "assets/img/radix-slate-dark.png"
		},
		"solarized": {
			"light": "assets/img/solarized-light.png",
			"dark": "assets/img/solarized-dark.png"
		},
		"rose-pine": "assets/img/rose-pine.png",
		"tokyo-night": "assets/img/tokyo-night.png",
		"kanagawa": {
			"light": "assets/img/kanagawa-lotus.png",
			"dark": "assets/img/kanagawa-wave.png"
		},
		"one-dark": {
			"light": "assets/img/one-light.png",
			"dark": "assets/img/one-dark.png"
		},
		"ayu": {
			"light": "assets/img/ayu-light.png",
			"dark": "assets/img/ayu-dark.png"
		},
		"turbo": "assets/img/terminal.png"
	};
	/** Predefined flavor descriptions keyed by theme id. */
	var FLAVOR_DESCRIPTIONS = {
		"ayu-dark": "Deep Ayu dark theme for low-light environments.",
		"ayu-light": "Bright Ayu palette designed for comfortable daytime coding.",
		"ayu-mirage": "Soft dark Ayu variant with subtle, muted accents.",
		"bulma-dark": "Dark Bulma theme tuned for low-light reading.",
		"bulma-light": "Classic Bulma look with a bright, neutral palette.",
		"catppuccin-frappe": "Balanced dark Catppuccin theme for focused work.",
		"catppuccin-latte": "Light, soft Catppuccin palette for daytime use.",
		"catppuccin-macchiato": "Deep, atmospheric Catppuccin variant with rich contrast.",
		"catppuccin-mocha": "Cozy, high-contrast Catppuccin theme for late-night sessions.",
		"dracula": "Iconic Dracula dark theme with vibrant accents.",
		"everforest-dark-hard": "Highest contrast dark Everforest palette with deep forest shadows.",
		"everforest-dark-soft": "Softer dark Everforest palette with reduced contrast.",
		"everforest-dark": "Classic Everforest dark palette with warm, natural greens.",
		"everforest-light-hard": "Bright, crisp Everforest light palette with extra contrast.",
		"everforest-light-soft": "Soft, low-contrast Everforest light palette for long sessions.",
		"everforest-light": "Classic Everforest light palette with warm paper tones.",
		"github-dark": "GitHub dark theme optimized for code-heavy views.",
		"github-light": "GitHub-inspired light theme suited for documentation and UI heavy pages.",
		"gruvbox-dark-hard": "Highest contrast dark Gruvbox palette with deep shadows.",
		"gruvbox-dark-soft": "Softer dark Gruvbox palette with reduced contrast.",
		"gruvbox-dark": "Classic Gruvbox dark palette with warm, muted tones.",
		"gruvbox-light-hard": "Bright, crisp Gruvbox light palette with extra contrast.",
		"gruvbox-light-soft": "Soft, low-contrast Gruvbox light palette for long sessions.",
		"gruvbox-light": "Classic Gruvbox light palette with warm paper tones.",
		"kanagawa-dragon": "Darker Kanagawa variant for late-night sessions.",
		"kanagawa-lotus": "Light Kanagawa palette for daytime use.",
		"kanagawa-wave": "Heart-warming dark Kanagawa palette inspired by The Great Wave.",
		"nord": "Arctic, north-bluish color palette inspired by the polar night.",
		"one-dark": "The classic Atom One Dark palette with vivid syntax accents.",
		"one-light": "Companion One Light palette for bright, daytime editing.",
		"radix-mauve-dark": "Neutral purple-gray Radix dark theme for accessible UIs.",
		"radix-mauve-light": "Neutral purple-gray Radix light theme for accessible UIs.",
		"radix-slate-dark": "Neutral blue-gray Radix dark theme for accessible UIs.",
		"radix-slate-light": "Neutral blue-gray Radix light theme for accessible UIs.",
		"rose-pine-dawn": "Light Rosé Pine variant for daytime use.",
		"rose-pine-moon": "Deeper variant of Rosé Pine with enhanced contrast.",
		"rose-pine": "Elegant dark theme with natural pine and soho vibes.",
		"solarized-dark": "Solarized Dark with a balanced, low-contrast palette.",
		"solarized-light": "Solarized Light tuned for bright, daylight-friendly UIs.",
		"terminal": "CRT phosphor green on void with IBM Plex Mono.",
		"tokyo-night-dark": "Deep midnight blues with neon accents.",
		"tokyo-night-light": "Clean daylight palette inspired by Tokyo mornings.",
		"tokyo-night-storm": "Stormy variant with richer contrast and depth."
	};
	//#endregion
	//#region packages/theme-selector/src/constants.ts
	/**
	* Constants for theme selector component
	*/
	var STORAGE_KEY = "turbo-theme";
	var DEFAULT_THEME = DEFAULT_THEME$1;
	/** ID of the CSS link element used by the blocking script to prevent FOUC. */
	var CSS_LINK_ID = "turbo-theme-css";
	var DOM_IDS = {
		THEME_FLAVOR_TRIGGER: "theme-flavor-trigger",
		THEME_FLAVOR_TRIGGER_ICON: "theme-flavor-trigger-icon",
		THEME_FLAVOR_TRIGGER_LABEL: "theme-flavor-trigger-label",
		THEME_FLAVOR_MENU: "theme-flavor-menu",
		THEME_FLAVOR_SELECT: "theme-flavor-select"
	};
	var DOM_SELECTORS = {
		DROPDOWN_ITEMS: `#${DOM_IDS.THEME_FLAVOR_MENU} .dropdown-item.theme-item`,
		NAVBAR_DROPDOWN: ".navbar-item.has-dropdown",
		NAV_REPORTS: "[data-testid=\"nav-reports\"]",
		NAVBAR_ITEM: ".navbar-item",
		HIGHLIGHT_PRE: ".highlight > pre",
		THEME_CSS_LINKS: "link[id^=\"theme-\"][id$=\"-css\"]"
	};
	/** Family display metadata — generated from schema/tokens/_vendors.json. */
	var THEME_FAMILIES = THEME_FAMILIES$1;
	//#endregion
	//#region packages/theme-selector/src/errors.ts
	/**
	* Centralized error handling for Turbo Themes.
	*
	* Provides a consistent error logging strategy with standardized message
	* formatting, error levels, and optional context for debugging.
	*/
	/** Log prefix for all theme-related messages */
	var LOG_PREFIX = "[turbo-themes]";
	/** Error severity levels */
	var ErrorLevel = {
		WARN: "warn",
		ERROR: "error"
	};
	/**
	* Factory functions for creating structured theme errors.
	* Each function returns a ThemeError with appropriate code, message, and level.
	*/
	var ThemeErrors = {
		/** Invalid theme ID provided */
		INVALID_THEME_ID: (themeId) => ({
			code: "INVALID_THEME_ID",
			message: `Invalid theme ID "${themeId}" not saved to storage`,
			level: ErrorLevel.WARN,
			context: { themeId }
		}),
		/** No themes available in registry */
		NO_THEMES_AVAILABLE: () => ({
			code: "NO_THEMES_AVAILABLE",
			message: "No themes available",
			level: ErrorLevel.ERROR
		}),
		/** Invalid theme icon path */
		INVALID_ICON_PATH: (themeId) => ({
			code: "INVALID_ICON_PATH",
			message: `Invalid theme icon path for ${themeId}`,
			level: ErrorLevel.WARN,
			context: { themeId }
		}),
		/** Theme initialization failed */
		INIT_FAILED: (error) => ({
			code: "INIT_FAILED",
			message: "Theme switcher initialization failed",
			level: ErrorLevel.ERROR,
			context: { error: error instanceof Error ? error.message : String(error) }
		}),
		/** Protocol-relative URL rejected for security */
		PROTOCOL_REJECTED: () => ({
			code: "PROTOCOL_REJECTED",
			message: "Protocol-relative base URL rejected for security",
			level: ErrorLevel.WARN
		}),
		/** Insecure HTTP URL rejected */
		INSECURE_HTTP_REJECTED: () => ({
			code: "INSECURE_HTTP_REJECTED",
			message: "Insecure HTTP base URL rejected",
			level: ErrorLevel.WARN
		}),
		/** Cross-origin URL rejected */
		CROSS_ORIGIN_REJECTED: (origin) => ({
			code: "CROSS_ORIGIN_REJECTED",
			message: `Cross-origin base URL rejected: ${origin}`,
			level: ErrorLevel.WARN,
			context: { origin }
		}),
		/** Invalid CSS path for theme */
		INVALID_CSS_PATH: (themeId) => ({
			code: "INVALID_CSS_PATH",
			message: `Invalid theme CSS path for ${themeId}`,
			level: ErrorLevel.WARN,
			context: { themeId }
		}),
		/** CSS failed to load */
		CSS_LOAD_FAILED: (themeId, error) => ({
			code: "CSS_LOAD_FAILED",
			message: `Theme CSS failed to load for ${themeId}`,
			level: ErrorLevel.WARN,
			context: {
				themeId,
				error: error instanceof Error ? error.message : String(error)
			}
		}),
		/** Storage unavailable (private browsing or disabled) */
		STORAGE_UNAVAILABLE: (operation, error) => ({
			code: "STORAGE_UNAVAILABLE",
			message: `localStorage ${operation} failed - storage may be unavailable`,
			level: ErrorLevel.WARN,
			context: {
				operation,
				error: error instanceof Error ? error.message : String(error)
			}
		})
	};
	/**
	* Log a theme error to the console with consistent formatting.
	*
	* @param themeError - The structured error to log
	*/
	function logThemeError(themeError) {
		const prefixedMessage = `${LOG_PREFIX} ${themeError.message}`;
		if (themeError.level === ErrorLevel.ERROR) if (themeError.context) console.error(prefixedMessage, themeError.context);
		else console.error(prefixedMessage);
		else if (themeError.context) console.warn(prefixedMessage, themeError.context);
		else console.warn(prefixedMessage);
	}
	//#endregion
	//#region packages/theme-selector/src/theme-loader.ts
	/**
	* Theme CSS loading utilities
	*/
	/**
	* Resolves an asset path relative to the site's base URL.
	*/
	function resolveAssetPath(assetPath, baseUrl) {
		const normalizedBase = baseUrl.replace(/\/$/, "");
		const base = normalizedBase ? `${window.location.origin}${normalizedBase}/` : `${window.location.origin}/`;
		return new URL(assetPath, base).pathname;
	}
	/**
	* Gets the base URL from the document's data-baseurl attribute.
	* Validates the URL to prevent injection attacks:
	* - Rejects protocol-relative URLs (//example.com)
	* - Rejects non-HTTPS absolute URLs (except localhost)
	* - Only allows same-origin or relative paths
	*/
	function getBaseUrl(doc) {
		const raw = doc.documentElement?.getAttribute("data-baseurl") || "";
		if (!raw) return "";
		if (raw.startsWith("//")) {
			logThemeError(ThemeErrors.PROTOCOL_REJECTED());
			return "";
		}
		if (raw.startsWith("http://") && !raw.startsWith("http://localhost")) {
			logThemeError(ThemeErrors.INSECURE_HTTP_REJECTED());
			return "";
		}
		try {
			const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
			const u = new URL(raw, currentOrigin);
			if (u.origin !== currentOrigin) {
				logThemeError(ThemeErrors.CROSS_ORIGIN_REJECTED(u.origin));
				return "";
			}
			return u.pathname.replace(/\/$/, "");
		} catch {
			return "";
		}
	}
	/**
	* Builds the element ID of a theme's stylesheet link.
	*
	* Single source of truth for the `theme-<id>-css` convention shared by
	* the loader and the lazy-CSS helpers.
	*
	* @param themeId - Theme whose stylesheet link ID to build
	* @returns The stylesheet link element ID
	*/
	function themeLinkId(themeId) {
		return `theme-${themeId}-css`;
	}
	/**
	* Extracts the theme ID from a theme link element's ID.
	* Strips a leading "theme-" prefix and trailing "-css" suffix.
	*/
	function extractThemeIdFromLinkId(linkId) {
		return linkId.replace(/^theme-/, "").replace(/-css$/, "");
	}
	/**
	* Clears onload/onerror handlers from a link element to prevent memory leaks.
	*/
	function clearLinkHandlers(link) {
		link.onload = null;
		link.onerror = null;
	}
	/**
	* Loads a CSS file with a timeout, returning a promise that resolves when loaded.
	*/
	function loadCSSWithTimeout(link, themeId, timeoutMs = 1e4) {
		return new Promise((resolve, reject) => {
			const timeoutId = setTimeout(() => {
				clearLinkHandlers(link);
				reject(/* @__PURE__ */ new Error(`Theme ${themeId} load timeout`));
			}, timeoutMs);
			link.onload = () => {
				clearTimeout(timeoutId);
				clearLinkHandlers(link);
				resolve();
			};
			link.onerror = () => {
				clearTimeout(timeoutId);
				clearLinkHandlers(link);
				reject(/* @__PURE__ */ new Error(`Failed to load theme ${themeId}`));
			};
		});
	}
	/**
	* Gets the current theme from document element classes
	*/
	function getCurrentThemeFromClasses(element) {
		const classList = Array.from(element.classList);
		for (const className of classList) if (className.startsWith("theme-")) return className.substring(6);
		return null;
	}
	/**
	* Applies theme class and root data attributes to the document element.
	*/
	function applyThemeClass(doc, themeId) {
		const themeClasses = Array.from(doc.documentElement.classList).filter((className) => className.startsWith("theme-"));
		if (themeClasses.length > 0) doc.documentElement.classList.remove(...themeClasses);
		doc.documentElement.classList.add(`theme-${themeId}`);
		doc.documentElement.setAttribute("data-theme", themeId);
		doc.documentElement.setAttribute("data-appearance", resolveThemeAppearance(themeId));
	}
	/**
	* Removes stale theme stylesheet links, keeping the given theme's link
	* and the shared base stylesheet.
	*/
	function removeStaleThemeLinks(doc, keepThemeId) {
		doc.querySelectorAll(DOM_SELECTORS.THEME_CSS_LINKS).forEach((link) => {
			const linkThemeId = extractThemeIdFromLinkId(link.id);
			if (linkThemeId !== keepThemeId && linkThemeId !== "base") link.remove();
		});
	}
	/**
	* Adopts the blocking script's link element for a theme (prevents
	* duplicate CSS loads).
	*
	* The repoint stays synchronous to preserve the blocking script's
	* FOUC-avoidance behaviour; this only makes its outcome observable by
	* awaiting the repointed link's load/error settlement. On load failure
	* the link is rolled back to its previous identity and href so the
	* document keeps the stylesheet that was already working.
	*
	* @returns true when the theme's CSS is confirmed loaded
	*/
	async function adoptBlockingLink(doc, blockingLink, theme, baseUrl) {
		let resolvedHref;
		try {
			resolvedHref = resolveAssetPath(theme.cssFile, baseUrl);
		} catch {
			logThemeError(ThemeErrors.INVALID_CSS_PATH(theme.id));
			return false;
		}
		const previousHref = blockingLink.getAttribute("href");
		blockingLink.id = themeLinkId(theme.id);
		blockingLink.setAttribute("data-theme-id", theme.id);
		if (previousHref === resolvedHref) {
			removeStaleThemeLinks(doc, theme.id);
			return true;
		}
		blockingLink.href = resolvedHref;
		try {
			await loadCSSWithTimeout(blockingLink, theme.id);
		} catch (error) {
			blockingLink.id = CSS_LINK_ID;
			blockingLink.removeAttribute("data-theme-id");
			if (previousHref !== null) blockingLink.href = previousHref;
			else blockingLink.removeAttribute("href");
			logThemeError(ThemeErrors.CSS_LOAD_FAILED(theme.id, error));
			return false;
		}
		removeStaleThemeLinks(doc, theme.id);
		return true;
	}
	/**
	* Loads theme CSS file if not already loaded.
	*
	* @returns true when the theme's stylesheet is present and confirmed
	*   loaded (or was already linked), false when path resolution or the
	*   network fetch failed
	*/
	async function loadThemeCSS(doc, theme, baseUrl) {
		const linkId = themeLinkId(theme.id);
		if (doc.getElementById(linkId)) {
			removeStaleThemeLinks(doc, theme.id);
			return true;
		}
		const blockingLink = doc.getElementById(CSS_LINK_ID);
		if (blockingLink) return adoptBlockingLink(doc, blockingLink, theme, baseUrl);
		const themeLink = doc.createElement("link");
		themeLink.id = linkId;
		themeLink.rel = "stylesheet";
		themeLink.type = "text/css";
		themeLink.setAttribute("data-theme-id", theme.id);
		try {
			themeLink.href = resolveAssetPath(theme.cssFile, baseUrl);
		} catch {
			logThemeError(ThemeErrors.INVALID_CSS_PATH(theme.id));
			return false;
		}
		doc.head.appendChild(themeLink);
		try {
			await loadCSSWithTimeout(themeLink, theme.id);
		} catch (error) {
			themeLink.remove();
			logThemeError(ThemeErrors.CSS_LOAD_FAILED(theme.id, error));
			return false;
		}
		removeStaleThemeLinks(doc, theme.id);
		return true;
	}
	//#endregion
	//#region packages/theme-selector/src/dropdown/helpers.ts
	/**
	* Dropdown helper functions
	*/
	/**
	* Sets the active state (is-active class and aria-checked) on a theme item element.
	*/
	function setItemActiveState(item, isActive) {
		if (isActive) item.classList.add("is-active");
		else item.classList.remove("is-active");
		item.setAttribute("aria-checked", String(isActive));
	}
	//#endregion
	//#region packages/theme-selector/src/theme-mapper.ts
	/**
	* Gets the theme family from vendor name
	*/
	function getFamily(vendor) {
		return VENDOR_FAMILY_MAP[vendor] ?? "catppuccin";
	}
	/**
	* Gets icon path for a vendor
	*/
	function getIconForVendor(vendor, appearance) {
		const iconConfig = VENDOR_ICON_MAP[vendor];
		if (!iconConfig) return;
		if (typeof iconConfig === "string") return iconConfig;
		return iconConfig[appearance];
	}
	/**
	* Gets description for a flavor
	*/
	function getDescriptionForFlavor(id, label) {
		return FLAVOR_DESCRIPTIONS[id] ?? `${label} theme`;
	}
	/**
	* Extracts preview colors from theme tokens
	*/
	function extractPreviewColors(tokens) {
		return {
			bg: tokens.background.base,
			surface: tokens.background.surface,
			accent: tokens.brand.primary,
			text: tokens.text.primary
		};
	}
	/**
	* Maps a canonical theme flavor to UI-specific format
	*/
	function mapFlavorToUI(flavor) {
		const family = getFamily(flavor.vendor);
		return {
			id: flavor.id,
			name: flavor.label,
			description: getDescriptionForFlavor(flavor.id, flavor.label),
			cssFile: `assets/css/themes/turbo/${flavor.id}.css`,
			icon: getIconForVendor(flavor.vendor, flavor.appearance),
			family,
			vendor: flavor.vendor,
			appearance: flavor.appearance,
			colors: extractPreviewColors(flavor.tokens)
		};
	}
	//#endregion
	//#region packages/theme-selector/src/theme-resolver.ts
	/**
	* Theme resolution utilities - centralized theme lookup and validation.
	*
	* Provides cached access to theme data and validation to avoid
	* repeated mapping and set creation across the codebase.
	*/
	var mappedThemes = null;
	var validThemeIds = null;
	/**
	* Gets all themes mapped to UI format.
	* Results are cached for performance.
	*/
	function getThemes() {
		if (!mappedThemes) mappedThemes = flavors.map(mapFlavorToUI);
		return mappedThemes || [];
	}
	/**
	* Gets a Set of all valid theme IDs.
	* Results are cached for performance.
	*/
	function getValidThemeIds() {
		if (!validThemeIds) validThemeIds = new Set(flavors.map((f) => f.id));
		return validThemeIds;
	}
	/**
	* Resolves a theme by ID, falling back to default if not found.
	*
	* @param themeId - The theme ID to resolve
	* @returns The matching theme, default theme, or first available theme
	*/
	function resolveTheme(themeId) {
		const themes = getThemes();
		return themes.find((t) => t.id === themeId) || themes.find((t) => t.id === DEFAULT_THEME) || themes[0];
	}
	/**
	* Validates a theme ID for safety and format correctness.
	*
	* Accepts only alphanumeric characters, hyphens, and underscores.
	* Rejects special characters, unicode, and excessively long IDs.
	*
	* @param id - The value to validate as a theme ID
	* @returns True if the ID is valid, false otherwise
	*/
	function isValidThemeId(id) {
		if (typeof id !== "string") return false;
		if (id.length === 0) return false;
		if (id.length > 100) return false;
		return /^[a-zA-Z0-9_-]+$/.test(id);
	}
	//#endregion
	//#region packages/theme-selector/src/apply-theme.ts
	/**
	* Theme application logic
	*/
	/**
	* Applies a theme to the document.
	*
	* @returns true when the theme's CSS is confirmed loaded, false when the
	*   theme could not be resolved or its stylesheet failed to load (the
	*   root attributes/class are still applied in the latter case)
	*/
	async function applyTheme$1(doc, themeId) {
		const theme = resolveTheme(themeId);
		if (!theme) {
			logThemeError(ThemeErrors.NO_THEMES_AVAILABLE());
			return false;
		}
		const baseUrl = getBaseUrl(doc);
		const trigger = doc.getElementById(DOM_IDS.THEME_FLAVOR_TRIGGER);
		if (trigger) trigger.classList.add("is-loading");
		try {
			applyThemeClass(doc, theme.id);
			const cssLoaded = await loadThemeCSS(doc, theme, baseUrl);
			const triggerIcon = doc.getElementById(DOM_IDS.THEME_FLAVOR_TRIGGER_ICON);
			if (triggerIcon && theme.icon) try {
				triggerIcon.src = resolveAssetPath(theme.icon, baseUrl);
				const familyName = THEME_FAMILIES[theme.family]?.name ?? theme.family;
				triggerIcon.alt = `${familyName} ${theme.name}`;
				triggerIcon.title = `${familyName} ${theme.name}`;
			} catch {
				logThemeError(ThemeErrors.INVALID_ICON_PATH(theme.id));
			}
			const triggerLabel = doc.getElementById(DOM_IDS.THEME_FLAVOR_TRIGGER_LABEL);
			if (triggerLabel) triggerLabel.textContent = theme.name;
			doc.querySelectorAll(DOM_SELECTORS.DROPDOWN_ITEMS).forEach((item) => {
				setItemActiveState(item, item.getAttribute("data-theme-id") === theme.id);
			});
			return cssLoaded;
		} finally {
			if (trigger) trigger.classList.remove("is-loading");
		}
	}
	/**
	* Gets the current theme from classes or returns default
	*/
	function getCurrentTheme$1(doc, defaultTheme) {
		return getCurrentThemeFromClasses(doc.documentElement) || defaultTheme;
	}
	//#endregion
	//#region packages/theme-selector/src/storage.ts
	/**
	* Storage utilities for theme persistence
	*/
	/**
	* Safely set an item in localStorage.
	* Returns false if storage is unavailable.
	*/
	function safeSetItem(windowObj, key, value) {
		try {
			windowObj.localStorage.setItem(key, value);
			return true;
		} catch (error) {
			logThemeError(ThemeErrors.STORAGE_UNAVAILABLE("setItem", error));
			return false;
		}
	}
	/**
	* Saves a theme to localStorage.
	* Optionally validates the theme ID against a set of valid IDs before saving.
	* Safely handles unavailable localStorage (e.g., private browsing).
	*
	* @param windowObj - Window object with localStorage
	* @param themeId - Theme ID to save
	* @param validIds - Optional set of valid theme IDs for validation
	* @returns true if saved successfully, false otherwise
	*/
	function saveTheme(windowObj, themeId, validIds) {
		if (validIds && !validIds.has(themeId)) {
			logThemeError(ThemeErrors.INVALID_THEME_ID(themeId));
			return false;
		}
		return safeSetItem(windowObj, STORAGE_KEY, themeId);
	}
	//#endregion
	//#region packages/theme-selector/src/integration.ts
	/**
	* Public integration API for driving theming from outside the package.
	*
	* Site pages (e.g. the homepage showcase) use these functions to apply a
	* theme, query the active theme, and subscribe to theme changes without
	* reaching into selector internals. The theme-selector package remains
	* the owner of persistence, the `data-theme`/`data-appearance` root
	* attributes, and dropdown state.
	*/
	/** Name of the CustomEvent dispatched on the document after a theme change. */
	var THEME_CHANGE_EVENT = "turbo-theme-change";
	/**
	* Dispatches the theme-change CustomEvent on the document.
	*
	* @param documentObj - Document to dispatch the event on
	* @param themeId - ID of the theme that was applied
	*/
	function emitThemeChange(documentObj, themeId) {
		const detail = {
			themeId,
			appearance: resolveThemeAppearance(themeId)
		};
		documentObj.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail }));
	}
	/**
	* Applies a theme by ID through the theme-selector pipeline.
	*
	* Persists the selection, updates the `data-theme`/`data-appearance`
	* attributes and theme CSS, syncs dropdown state, and notifies
	* subscribers via the theme-change event.
	*
	* Each stage is reported independently in the returned
	* {@link ApplyThemeResult} so consumers can distinguish full success
	* from partial application:
	*
	* - Unknown or malformed theme IDs are rejected: nothing is applied, no
	*   event is dispatched, and all result fields are false.
	* - `persisted` is false when localStorage is unavailable or over
	*   quota; the theme is still applied visually.
	* - `cssLoaded` is false when the stylesheet fetch fails; the root
	*   attributes have changed but the previous theme's CSS remains in
	*   effect, so the theme-change event is NOT dispatched.
	*
	* The theme-change event fires only when the theme is visually applied
	* (`applied && cssLoaded`); persistence failure alone does not suppress
	* it.
	*
	* @param themeId - ID of the theme to apply (e.g. `catppuccin-mocha`)
	* @param documentObj - Document to apply the theme to (defaults to global)
	* @param windowObj - Window used for persistence (defaults to global)
	* @returns Per-stage outcome of the application
	*/
	async function applyTheme(themeId, documentObj = document, windowObj = window) {
		const validIds = getValidThemeIds();
		if (!isValidThemeId(themeId) || !validIds.has(themeId)) {
			logThemeError(ThemeErrors.INVALID_THEME_ID(themeId));
			return {
				applied: false,
				cssLoaded: false,
				persisted: false
			};
		}
		const persisted = saveTheme(windowObj, themeId, validIds);
		const cssLoaded = await applyTheme$1(documentObj, themeId);
		if (cssLoaded) emitThemeChange(documentObj, themeId);
		return {
			applied: true,
			cssLoaded,
			persisted
		};
	}
	/**
	* Gets the ID of the currently active theme.
	*
	* Prefers the `data-theme` root attribute (set by both the blocking
	* script and the theme-selector), falls back to the `theme-*` class,
	* and finally to the default theme.
	*
	* @param documentObj - Document to inspect (defaults to global)
	* @returns The active theme ID
	*/
	function getCurrentTheme(documentObj = document) {
		const fromAttribute = documentObj.documentElement.getAttribute("data-theme");
		if (fromAttribute) return fromAttribute;
		return getCurrentTheme$1(documentObj, DEFAULT_THEME);
	}
	/**
	* Subscribes to theme-change notifications.
	*
	* The listener fires after each successful theme application — whether
	* triggered through applyTheme or the dropdown UI — with the applied
	* theme ID and its light/dark appearance.
	*
	* @param listener - Callback invoked with each theme-change payload
	* @param documentObj - Document to listen on (defaults to global)
	* @returns Function that removes the listener when called
	*/
	function subscribeToThemeChanges(listener, documentObj = document) {
		const handler = (event) => {
			const detail = event.detail;
			if (detail) listener(detail);
		};
		documentObj.addEventListener(THEME_CHANGE_EVENT, handler);
		return () => documentObj.removeEventListener(THEME_CHANGE_EVENT, handler);
	}
	//#endregion
	//#region packages/theme-selector/src/lazy-css.ts
	/**
	* Lazy theme-CSS loading helpers for showcase-style pages.
	*
	* Instead of eagerly linking every theme's stylesheet, a page loads only
	* the default/active theme CSS up front and fetches the rest on demand.
	* These helpers provide the load decision, an inject-once on-demand
	* loader built on the package's `loadThemeCSS` pipeline, and a
	* hover-triggered prefetch that hides switch latency for elements
	* marked with the `data-theme-preview` attribute (e.g. marquee cards).
	*/
	/** Attribute whose value names the theme to prefetch on hover/focus. */
	var PREFETCH_TRIGGER_ATTRIBUTE = "data-theme-preview";
	/**
	* Builds the element ID of a theme's prefetch link.
	*
	* @param themeId - Theme whose prefetch link ID to build
	* @returns The prefetch link element ID
	*/
	function themePrefetchLinkId(themeId) {
		return `theme-${themeId}-prefetch`;
	}
	/**
	* Checks whether a theme ID is well-formed and registered.
	*
	* @param themeId - Theme ID to check
	* @returns True when the ID names a known theme
	*/
	function isKnownThemeId(themeId) {
		return isValidThemeId(themeId) && getValidThemeIds().has(themeId);
	}
	/**
	* Checks whether a theme's stylesheet is already present in the document.
	*
	* Recognises both links owned by the selector (`theme-<id>-css`) and the
	* blocking script's FOUC-prevention link when it points at the theme.
	*
	* @param documentObj - Document to inspect
	* @param themeId - Theme whose stylesheet to look for
	* @returns True when the theme's CSS is already linked
	*/
	function isThemeCSSLoaded(documentObj, themeId) {
		if (documentObj.getElementById(themeLinkId(themeId))) return true;
		const blockingLink = documentObj.getElementById(CSS_LINK_ID);
		if (!blockingLink) return false;
		if (blockingLink.getAttribute("data-theme-id") === themeId) return true;
		return (blockingLink.getAttribute("href") ?? "").endsWith(`/${themeId}.css`);
	}
	/**
	* Prefetches a theme's CSS so a later switch hits the browser cache.
	*
	* Injects a `<link rel="prefetch" as="style">` at most once per theme.
	* Skips themes whose stylesheet is already linked, themes already
	* prefetched, and unknown theme IDs.
	*
	* @param documentObj - Document to inject the prefetch link into
	* @param themeId - Theme whose CSS to prefetch
	* @returns True when a prefetch link was injected by this call
	*/
	function prefetchThemeCSS(documentObj, themeId) {
		if (!isKnownThemeId(themeId)) return false;
		if (isThemeCSSLoaded(documentObj, themeId)) return false;
		if (documentObj.getElementById(themePrefetchLinkId(themeId))) return false;
		const theme = resolveTheme(themeId);
		if (!theme) return false;
		let href;
		try {
			href = resolveAssetPath(theme.cssFile, getBaseUrl(documentObj));
		} catch {
			logThemeError(ThemeErrors.INVALID_CSS_PATH(themeId));
			return false;
		}
		const link = documentObj.createElement("link");
		link.id = themePrefetchLinkId(themeId);
		link.rel = "prefetch";
		link.setAttribute("as", "style");
		link.href = href;
		link.setAttribute("data-theme-prefetch", themeId);
		documentObj.head.appendChild(link);
		return true;
	}
	/**
	* Wires hover/focus-triggered CSS prefetch for marked elements.
	*
	* Listens for `mouseover` and `focusin` on the document and prefetches
	* the theme named by the nearest ancestor carrying the
	* `data-theme-preview` attribute. Delegation means marquee items added
	* after wiring are covered without re-wiring.
	*
	* @param documentObj - Document to listen on (defaults to global)
	* @returns Function that removes the listeners when called
	*/
	function wireHoverPrefetch(documentObj = document) {
		const handler = (event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			const trigger = target.closest(`[${PREFETCH_TRIGGER_ATTRIBUTE}]`);
			if (!trigger) return;
			const themeId = trigger.getAttribute(PREFETCH_TRIGGER_ATTRIBUTE);
			if (!themeId) return;
			prefetchThemeCSS(documentObj, themeId);
		};
		documentObj.addEventListener("mouseover", handler);
		documentObj.addEventListener("focusin", handler);
		return () => {
			documentObj.removeEventListener("mouseover", handler);
			documentObj.removeEventListener("focusin", handler);
		};
	}
	//#endregion
	//#region assets/js/homepage-showcase.ts
	/**
	* Homepage showcase interactions.
	*
	* Spotlight drift, comet-card tilt, text mask, scroll reveals, theme marquee
	* pause, and the interactive preview card. Pure state transitions are exported
	* for unit testing; DOM wiring stays thin and is initialized on
	* DOMContentLoaded.
	*
	* Theming goes exclusively through the theme-selector integration API
	* (ADR-0007): marquee clicks call `applyTheme`, hover prefetch comes from
	* the lazy-CSS helpers, and UI state follows `turbo-theme-change` events
	* plus a `data-theme` attribute observer (covering the header dropdown).
	* Theme metadata is server-rendered as data attributes on the marquee
	* cards (`data-theme-preview`/`data-theme-name`/`data-theme-icon`) instead
	* of an injected global.
	*/
	/** Fallback icon used when a theme has no dedicated icon entry. */
	var DEFAULT_THEME_ICON = "catppuccin-logo-macchiato.png";
	/** Maximum spotlight drift, in pixels, before the direction flips. */
	var SPOTLIGHT_LIMIT = 100;
	/** Pixels the spotlight drifts per animation frame. */
	var SPOTLIGHT_STEP = .15;
	/** Maximum comet-card tilt, in degrees, on each axis. */
	var MAX_TILT_DEGREES = 14;
	/** Progress percentage the preview card animates to. */
	var PROGRESS_TARGET = 92;
	/** Tilt targets when the pointer is not over the comet card. */
	var RESTING_TILT_TARGETS = {
		rotateX: 0,
		rotateY: 0,
		glareX: 50,
		glareY: 50
	};
	/** Attribute naming the theme a showcase element previews/applies. */
	var THEME_TRIGGER_ATTRIBUTE = "data-theme-preview";
	/** Attribute carrying a theme's full display name on a marquee card. */
	var THEME_NAME_ATTRIBUTE = "data-theme-name";
	/** Attribute carrying a theme's icon filename on a marquee card. */
	var THEME_ICON_ATTRIBUTE = "data-theme-icon";
	/**
	* Check whether the user prefers reduced motion.
	*
	* @param source - Object exposing matchMedia (usually window).
	* @returns True when reduced motion is requested.
	*/
	function prefersReducedMotion(source) {
		return source.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}
	/**
	* Advance the spotlight drift by one frame, bouncing at the limits.
	*
	* @param state - Current offset and direction.
	* @param step - Pixels to drift this frame.
	* @param limit - Absolute offset at which the direction flips.
	* @returns The next spotlight state.
	*/
	function stepSpotlight(state, step = SPOTLIGHT_STEP, limit = 100) {
		const offset = state.offset + state.direction * step;
		let direction = state.direction;
		if (offset > limit) direction = -1;
		if (offset < -limit) direction = 1;
		return {
			offset,
			direction
		};
	}
	/**
	* Compute tilt and glare targets for a pointer position over the card.
	*
	* @param clientX - Pointer x coordinate in viewport space.
	* @param clientY - Pointer y coordinate in viewport space.
	* @param rect - Card bounding box.
	* @param maxTilt - Maximum tilt in degrees on each axis.
	* @returns Rotation and glare targets.
	*/
	function computeTiltTargets(clientX, clientY, rect, maxTilt = 14) {
		const xPct = (clientX - rect.left) / rect.width - .5;
		return {
			rotateX: -((clientY - rect.top) / rect.height - .5) * maxTilt,
			rotateY: xPct * maxTilt,
			glareX: (clientX - rect.left) / rect.width * 100,
			glareY: (clientY - rect.top) / rect.height * 100
		};
	}
	/**
	* Move a value a fraction of the way toward a target (ease-out step).
	*
	* @param current - Current value.
	* @param target - Target value.
	* @param rate - Fraction of the remaining distance to cover (0..1).
	* @returns The eased value.
	*/
	function approach(current, target, rate) {
		return current + (target - current) * rate;
	}
	/**
	* Convert a pointer position into percentages within a bounding box.
	*
	* @param clientX - Pointer x coordinate in viewport space.
	* @param clientY - Pointer y coordinate in viewport space.
	* @param rect - Element bounding box.
	* @returns X/Y position as percentages (0..100).
	*/
	function pointerPercent(clientX, clientY, rect) {
		return {
			x: (clientX - rect.left) / rect.width * 100,
			y: (clientY - rect.top) / rect.height * 100
		};
	}
	/**
	* Decide the marquee row's animation-play-state for a hover state.
	*
	* @param isHovering - Whether the pointer is over the row.
	* @returns 'paused' while hovering, 'running' otherwise.
	*/
	function marqueePlayState(isHovering) {
		return isHovering ? "paused" : "running";
	}
	/**
	* Activate the tab and panel matching a target and deactivate the rest.
	*
	* @param tabs - Preview tab buttons (data-preview-tab).
	* @param panels - Preview panels (data-preview-panel).
	* @param target - The data-preview-tab value to activate.
	*/
	function applyTabSelection(tabs, panels, target) {
		for (const tab of tabs) {
			const isActive = tab.getAttribute("data-preview-tab") === target;
			tab.classList.toggle("active", isActive);
			tab.setAttribute("aria-selected", isActive ? "true" : "false");
			tab.tabIndex = isActive ? 0 : -1;
		}
		for (const panel of panels) {
			const isActive = panel.getAttribute("data-preview-panel") === target;
			panel.classList.toggle("is-active", isActive);
			panel.hidden = !isActive;
		}
	}
	/**
	* Resolve the tab index a tablist keydown should move focus to.
	*
	* Implements the horizontal ARIA tablist keyboard pattern (APG): Left/Right
	* arrows move with wrap-around, Home/End jump to the edges. Activation is
	* manual — Enter/Space fire the tab's native button click, so only focus
	* movement is handled here.
	*
	* @param key - The KeyboardEvent.key value.
	* @param currentIndex - Index of the tab that received the event.
	* @param count - Total number of tabs.
	* @returns The index to focus, or null when the key is not handled.
	*/
	function nextTabFocusIndex(key, currentIndex, count) {
		if (count <= 0) return null;
		switch (key) {
			case "ArrowRight": return (currentIndex + 1) % count;
			case "ArrowLeft": return (currentIndex - 1 + count) % count;
			case "Home": return 0;
			case "End": return count - 1;
			default: return null;
		}
	}
	/**
	* Move roving-tabindex focus to a tab without changing the selection.
	*
	* Per the ARIA tablist pattern, only the focused tab stays in the tab
	* order; selection follows activation (Enter/Space/click), not focus.
	*
	* @param tabs - Preview tab buttons in document order.
	* @param index - Index of the tab to focus.
	*/
	function focusTab(tabs, index) {
		const target = tabs[index];
		if (!target) return;
		for (const [i, tab] of tabs.entries()) tab.tabIndex = i === index ? 0 : -1;
		target.focus();
	}
	/**
	* Read showcase theme metadata from server-rendered data attributes.
	*
	* The page renders one marquee card per theme carrying
	* `data-theme-preview`, `data-theme-name`, and `data-theme-icon`; the
	* base URL comes from the root element's `data-baseurl` attribute.
	*
	* @param documentObj - Document to read the metadata from.
	* @returns Metadata for preview-card and marquee updates.
	*/
	function readShowcaseMeta(documentObj) {
		const meta = {
			baseUrl: documentObj.documentElement.getAttribute("data-baseurl") ?? "",
			themeFullNames: {},
			themeIcons: {}
		};
		for (const el of documentObj.querySelectorAll(`[${THEME_TRIGGER_ATTRIBUTE}]`)) {
			const themeId = el.getAttribute(THEME_TRIGGER_ATTRIBUTE);
			if (!themeId) continue;
			const fullName = el.getAttribute(THEME_NAME_ATTRIBUTE);
			const icon = el.getAttribute(THEME_ICON_ATTRIBUTE);
			if (fullName) meta.themeFullNames[themeId] = fullName;
			if (icon) meta.themeIcons[themeId] = icon;
		}
		return meta;
	}
	/**
	* Mark the trigger matching a theme active and deactivate the rest.
	*
	* @param triggers - Elements carrying the data-theme-preview attribute.
	* @param themeId - The active theme's identifier.
	*/
	function syncThemeTriggers(triggers, themeId) {
		for (const trigger of triggers) {
			const isActive = trigger.getAttribute(THEME_TRIGGER_ATTRIBUTE) === themeId;
			trigger.classList.toggle("active", isActive);
			trigger.setAttribute("aria-pressed", isActive ? "true" : "false");
		}
	}
	/**
	* Resolve the display name and icon URL for a theme from page metadata.
	*
	* @param theme - Theme identifier (e.g. 'catppuccin-mocha').
	* @param meta - Theme metadata read from the page.
	* @returns Display name and fully-qualified icon source.
	*/
	function resolveThemeDisplay(theme, meta) {
		const name = meta.themeFullNames[theme] ?? theme;
		const icon = meta.themeIcons[theme] ?? "catppuccin-logo-macchiato.png";
		return {
			name,
			iconSrc: `${meta.baseUrl}/assets/img/${icon}`
		};
	}
	/**
	* Render the progress bar at a given percentage.
	*
	* @param elements - Progress bar elements.
	* @param percent - Percentage to render (0..100).
	*/
	function renderProgress(elements, percent) {
		elements.fill.style.width = `${percent}%`;
		elements.value.textContent = `${percent}%`;
		elements.bar?.setAttribute("aria-valuenow", String(percent));
	}
	/**
	* Animate the progress bar from zero to its target.
	*
	* With reduced motion the target renders immediately; otherwise the target
	* render is deferred via the scheduler so the CSS transition can play.
	*
	* @param elements - Progress bar elements.
	* @param options - Target percentage, reduced-motion flag, and scheduler.
	*/
	function animateProgress(elements, options) {
		const { target, reducedMotion } = options;
		renderProgress(elements, 0);
		if (reducedMotion) {
			renderProgress(elements, target);
			return;
		}
		(options.schedule ?? ((callback) => {
			requestAnimationFrame(() => {
				requestAnimationFrame(callback);
			});
		}))(() => {
			renderProgress(elements, target);
		});
	}
	/** No-op cleanup used when a feature has nothing to tear down. */
	var NOOP_CLEANUP = () => void 0;
	/** Active showcase cleanup; replaced on each `initShowcase` call. */
	var activeShowcaseCleanup = null;
	/**
	* Start the spotlight drift animation.
	*
	* @param reducedMotion - Whether the user prefers reduced motion.
	* @returns Cleanup that cancels the RAF loop.
	*/
	function initSpotlight(reducedMotion) {
		const root = document.getElementById("showcase-spotlight");
		if (!root || reducedMotion) return NOOP_CLEANUP;
		const left = root.querySelector(".showcase-spotlight-left");
		const right = root.querySelector(".showcase-spotlight-right");
		if (!left || !right) return NOOP_CLEANUP;
		let state = {
			offset: 0,
			direction: 1
		};
		let cancelled = false;
		let rafId = 0;
		const tick = () => {
			if (cancelled) return;
			state = stepSpotlight(state);
			left.style.transform = `translateX(${state.offset}px)`;
			right.style.transform = `translateX(${-state.offset}px)`;
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);
		return () => {
			cancelled = true;
			cancelAnimationFrame(rafId);
		};
	}
	/**
	* Wire the comet-card tilt and glare animation.
	*
	* @param reducedMotion - Whether the user prefers reduced motion.
	* @returns Cleanup that cancels the RAF loop and removes pointer listeners.
	*/
	function initCometCard(reducedMotion) {
		const card = document.getElementById("showcase-comet-card");
		const glare = document.getElementById("showcase-comet-glare");
		if (!card || reducedMotion) return NOOP_CLEANUP;
		let current = { ...RESTING_TILT_TARGETS };
		let targets = { ...RESTING_TILT_TARGETS };
		let cancelled = false;
		let rafId = 0;
		const onMouseMove = (event) => {
			targets = computeTiltTargets(event.clientX, event.clientY, card.getBoundingClientRect());
		};
		const onMouseLeave = () => {
			targets = { ...RESTING_TILT_TARGETS };
		};
		card.addEventListener("mousemove", onMouseMove);
		card.addEventListener("mouseleave", onMouseLeave);
		const animate = () => {
			if (cancelled) return;
			current = {
				rotateX: approach(current.rotateX, targets.rotateX, .12),
				rotateY: approach(current.rotateY, targets.rotateY, .12),
				glareX: approach(current.glareX, targets.glareX, .15),
				glareY: approach(current.glareY, targets.glareY, .15)
			};
			card.style.transform = `perspective(900px) rotateX(${current.rotateX}deg) rotateY(${current.rotateY}deg) scale3d(1.02,1.02,1.02)`;
			if (glare) glare.style.background = `radial-gradient(circle at ${current.glareX}% ${current.glareY}%, color-mix(in srgb, var(--turbo-text-primary) 35%, transparent) 0%, transparent 65%)`;
			rafId = requestAnimationFrame(animate);
		};
		rafId = requestAnimationFrame(animate);
		return () => {
			cancelled = true;
			cancelAnimationFrame(rafId);
			card.removeEventListener("mousemove", onMouseMove);
			card.removeEventListener("mouseleave", onMouseLeave);
		};
	}
	/**
	* Wire the hover-following text mask.
	*
	* @param reducedMotion - Whether the user prefers reduced motion.
	* @returns Cleanup that removes the hover listeners.
	*/
	function initTextMask(reducedMotion) {
		const wrap = document.getElementById("showcase-text-mask");
		if (!wrap || reducedMotion) return NOOP_CLEANUP;
		const onMouseMove = (event) => {
			const { x, y } = pointerPercent(event.clientX, event.clientY, wrap.getBoundingClientRect());
			wrap.style.setProperty("--mx", `${x}%`);
			wrap.style.setProperty("--my", `${y}%`);
			wrap.classList.add("is-hovering");
		};
		const onMouseLeave = () => {
			wrap.classList.remove("is-hovering");
			wrap.style.setProperty("--mx", "50%");
			wrap.style.setProperty("--my", "50%");
		};
		wrap.addEventListener("mousemove", onMouseMove);
		wrap.addEventListener("mouseleave", onMouseLeave);
		return () => {
			wrap.removeEventListener("mousemove", onMouseMove);
			wrap.removeEventListener("mouseleave", onMouseLeave);
		};
	}
	/**
	* Reveal elements on scroll, or immediately with reduced motion.
	*
	* @param reducedMotion - Whether the user prefers reduced motion.
	* @returns Cleanup that disconnects the reveal observer.
	*/
	function initScrollReveal(reducedMotion) {
		if (!("IntersectionObserver" in window)) return NOOP_CLEANUP;
		const items = document.querySelectorAll("[data-showcase-reveal]");
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		}, {
			threshold: .15,
			rootMargin: "0px 0px -40px 0px"
		});
		for (const el of items) if (reducedMotion) el.classList.add("is-visible");
		else observer.observe(el);
		return () => observer.disconnect();
	}
	/**
	* Pause marquee rows on hover and resume on leave.
	*
	* @returns Cleanup that removes the hover listeners from every row.
	*/
	function initMarqueePause() {
		const teardowns = [];
		for (const row of document.querySelectorAll(".showcase-marquee-row")) {
			const onEnter = () => {
				row.style.animationPlayState = marqueePlayState(true);
			};
			const onLeave = () => {
				row.style.animationPlayState = marqueePlayState(false);
			};
			row.addEventListener("mouseenter", onEnter);
			row.addEventListener("mouseleave", onLeave);
			teardowns.push(() => {
				row.removeEventListener("mouseenter", onEnter);
				row.removeEventListener("mouseleave", onLeave);
			});
		}
		return () => {
			for (const teardown of teardowns) teardown();
		};
	}
	/**
	* Wire the interactive preview card: tabs, progress bar, buttons, and
	* theme-change updates.
	*
	* @param reducedMotion - Whether the user prefers reduced motion.
	* @param meta - Theme metadata read from the page.
	* @returns Handler that re-renders the card for a newly active theme.
	*/
	function initPreviewCard(reducedMotion, meta) {
		const tabs = Array.from(document.querySelectorAll(".showcase-preview-tab"));
		const panels = Array.from(document.querySelectorAll(".showcase-preview-panel"));
		const toast = document.getElementById("showcase-preview-toast");
		let toastTimer;
		const progressFill = document.getElementById("showcase-progress-fill");
		const progressValue = document.getElementById("showcase-progress-value");
		const progressBar = document.getElementById("showcase-progress-bar");
		const progressElements = progressFill && progressValue ? {
			fill: progressFill,
			value: progressValue,
			bar: progressBar
		} : null;
		const showToast = (message) => {
			if (!toast) return;
			toast.textContent = message;
			toast.hidden = false;
			clearTimeout(toastTimer);
			toastTimer = setTimeout(() => {
				toast.hidden = true;
			}, 1600);
		};
		const runProgress = () => {
			if (!progressElements) return;
			animateProgress(progressElements, {
				target: 92,
				reducedMotion
			});
		};
		for (const [index, tab] of tabs.entries()) {
			tab.addEventListener("click", () => {
				const target = tab.getAttribute("data-preview-tab");
				if (!target) return;
				applyTabSelection(tabs, panels, target);
				if (target === "overview") runProgress();
			});
			tab.addEventListener("keydown", (event) => {
				const focusIndex = nextTabFocusIndex(event.key, index, tabs.length);
				if (focusIndex === null) return;
				event.preventDefault();
				focusTab(tabs, focusIndex);
			});
		}
		const codeBtn = document.getElementById("showcase-preview-code");
		if (codeBtn) codeBtn.addEventListener("click", () => {
			const snippet = "background: var(--turbo-bg-surface);\ncolor: var(--turbo-text-primary);";
			if (typeof navigator.clipboard?.writeText === "function") navigator.clipboard.writeText(snippet).then(() => {
				showToast("Copied CSS snippet");
			}).catch(() => {
				showToast(snippet);
			});
			else showToast(snippet);
		});
		const primaryBtn = document.getElementById("showcase-preview-primary");
		if (primaryBtn) primaryBtn.addEventListener("click", () => {
			primaryBtn.classList.add("is-pressed");
			showToast("Primary action");
			setTimeout(() => {
				primaryBtn.classList.remove("is-pressed");
			}, 300);
		});
		const outlineBtn = document.getElementById("showcase-preview-outline");
		if (outlineBtn) outlineBtn.addEventListener("click", () => {
			outlineBtn.classList.toggle("is-active");
			showToast(outlineBtn.classList.contains("is-active") ? "Outline active" : "Outline default");
		});
		const renderTheme = (theme) => {
			const display = resolveThemeDisplay(theme, meta);
			const nameEl = document.getElementById("showcase-preview-theme-name");
			const iconEl = document.getElementById("showcase-preview-theme-icon");
			if (nameEl) nameEl.textContent = display.name;
			if (iconEl instanceof HTMLImageElement) iconEl.src = display.iconSrc;
			if (document.querySelector("[data-preview-panel=\"overview\"]")?.classList.contains("is-active")) runProgress();
		};
		runProgress();
		return renderTheme;
	}
	/**
	* Invoke a callback on every theme change, whatever the channel.
	*
	* Covers changes driven through the integration API (marquee clicks)
	* via `turbo-theme-change` events, and changes applied outside it (the
	* header dropdown) via a `data-theme` attribute observer. Consecutive
	* duplicate notifications are collapsed.
	*
	* @param onTheme - Callback invoked with each newly active theme ID.
	* @returns Cleanup that removes the event listener and disconnects the observer.
	*/
	function wireThemeObserver(onTheme) {
		let lastTheme = null;
		const notify = (themeId) => {
			if (!themeId || themeId === lastTheme) return;
			lastTheme = themeId;
			onTheme(themeId);
		};
		const unsubscribe = subscribeToThemeChanges((detail) => {
			notify(detail.themeId);
		}, document);
		const observer = new MutationObserver(() => {
			notify(document.documentElement.getAttribute("data-theme"));
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"]
		});
		return () => {
			unsubscribe();
			observer.disconnect();
		};
	}
	/**
	* Wire the marquee theme cards to the theme-selector integration API.
	*
	* Clicks on `[data-theme-preview]` elements apply the named theme through
	* `applyTheme` (which lazily loads its CSS); hovering or focusing a card
	* prefetches the theme's stylesheet via the lazy-CSS helpers.
	*
	* Partial applications are surfaced: when the stylesheet fails to load
	* the selector keeps the previous theme's CSS in effect and suppresses
	* the theme-change event, so the page logs the failure instead of
	* pretending the switch happened.
	*
	* @returns Cleanup that removes click and prefetch listeners.
	*/
	function initThemeControls() {
		const onClick = (event) => {
			const target = event.target;
			if (!(target instanceof Element)) return;
			const themeId = target.closest(`[${THEME_TRIGGER_ATTRIBUTE}]`)?.getAttribute(THEME_TRIGGER_ATTRIBUTE);
			if (!themeId) return;
			applyTheme(themeId).then((result) => {
				if (!result.applied || !result.cssLoaded) console.warn(`Theme "${themeId}" was not fully applied: its stylesheet failed to load, keeping the previous theme CSS.`);
			});
		};
		document.addEventListener("click", onClick);
		const unwirePrefetch = wireHoverPrefetch(document);
		return () => {
			document.removeEventListener("click", onClick);
			unwirePrefetch();
		};
	}
	/**
	* Initialize every showcase interaction on the current document.
	*
	* Re-entrant: a second call tears down the previous initialization first
	* so RAF loops and document-level listeners never accumulate.
	*
	* @returns Cleanup that cancels animations and removes listeners.
	*/
	function initShowcase() {
		activeShowcaseCleanup?.();
		const reducedMotion = prefersReducedMotion(window);
		const meta = readShowcaseMeta(document);
		const cleanups = [
			initSpotlight(reducedMotion),
			initCometCard(reducedMotion),
			initThemeControls(),
			initTextMask(reducedMotion),
			initScrollReveal(reducedMotion),
			initMarqueePause()
		];
		const renderTheme = initPreviewCard(reducedMotion, meta);
		const syncTheme = (themeId) => {
			syncThemeTriggers(Array.from(document.querySelectorAll(`[${THEME_TRIGGER_ATTRIBUTE}]`)), themeId);
			renderTheme(themeId);
		};
		cleanups.push(wireThemeObserver(syncTheme));
		syncTheme(getCurrentTheme(document));
		const cleanup = () => {
			for (const teardown of cleanups) teardown();
			if (activeShowcaseCleanup === cleanup) activeShowcaseCleanup = null;
		};
		activeShowcaseCleanup = cleanup;
		return cleanup;
	}
	if (typeof document !== "undefined" && typeof window !== "undefined") document.addEventListener("DOMContentLoaded", () => {
		initShowcase();
	});
	//#endregion
	exports.DEFAULT_THEME_ICON = DEFAULT_THEME_ICON;
	exports.MAX_TILT_DEGREES = MAX_TILT_DEGREES;
	exports.PROGRESS_TARGET = PROGRESS_TARGET;
	exports.RESTING_TILT_TARGETS = RESTING_TILT_TARGETS;
	exports.SPOTLIGHT_LIMIT = SPOTLIGHT_LIMIT;
	exports.SPOTLIGHT_STEP = SPOTLIGHT_STEP;
	exports.THEME_ICON_ATTRIBUTE = THEME_ICON_ATTRIBUTE;
	exports.THEME_NAME_ATTRIBUTE = THEME_NAME_ATTRIBUTE;
	exports.THEME_TRIGGER_ATTRIBUTE = THEME_TRIGGER_ATTRIBUTE;
	exports.animateProgress = animateProgress;
	exports.applyTabSelection = applyTabSelection;
	exports.approach = approach;
	exports.computeTiltTargets = computeTiltTargets;
	exports.focusTab = focusTab;
	exports.initShowcase = initShowcase;
	exports.marqueePlayState = marqueePlayState;
	exports.nextTabFocusIndex = nextTabFocusIndex;
	exports.pointerPercent = pointerPercent;
	exports.prefersReducedMotion = prefersReducedMotion;
	exports.readShowcaseMeta = readShowcaseMeta;
	exports.renderProgress = renderProgress;
	exports.resolveThemeDisplay = resolveThemeDisplay;
	exports.stepSpotlight = stepSpotlight;
	exports.syncThemeTriggers = syncThemeTriggers;
	return exports;
})({});

//# sourceMappingURL=homepage-showcase.js.map