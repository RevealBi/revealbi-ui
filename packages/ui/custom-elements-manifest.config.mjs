import { customElementVsCodePlugin } from 'custom-element-vs-code-integration';
import { customElementJetBrainsPlugin } from 'custom-element-jet-brains-integration';
import commandLineArgs from 'command-line-args';

const { outdir } = commandLineArgs([
    { name: 'analyze', defaultOption: true },
    { name: 'litelement', type: String },
    { name: 'outdir', type: String }
  ]);

export default {
    globs: ['src/components/**/*.component.ts'],
    exclude: ['**/*.styles.ts', '**/*.test.ts'], 
    plugins: [ 
      customElementVsCodePlugin({ outdir: outdir, cssFileName: null }),
      customElementJetBrainsPlugin({ outdir: outdir, excludeCss: true, packageJson: false })
    ]
}