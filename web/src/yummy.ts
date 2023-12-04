import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const yummy: CustomThemeConfig = {
    name: 'yummy',
    properties: {
        // =~= Theme Properties =~=
        '--theme-font-family-base': `system-ui`,
        '--theme-font-family-heading': `system-ui`,
        '--theme-font-color-base': '0 0 0',
        '--theme-font-color-dark': '255 255 255',
        '--theme-rounded-base': '16px',
        '--theme-rounded-container': '6px',
        '--theme-border-base': '1px',
        // =~= Theme On-X Colors =~=
        '--on-primary': '0 0 0',
        '--on-secondary': '0 0 0',
        '--on-tertiary': '0 0 0',
        '--on-success': '0 0 0',
        '--on-warning': '0 0 0',
        '--on-error': '0 0 0',
        '--on-surface': '255 255 255',
        // =~= Theme Colors  =~=
        // primary | #f97316
        '--color-primary-50': '254 234 220', // #feeadc
        '--color-primary-100': '254 227 208', // #fee3d0
        '--color-primary-200': '254 220 197', // #fedcc5
        '--color-primary-300': '253 199 162', // #fdc7a2
        '--color-primary-400': '251 157 92', // #fb9d5c
        '--color-primary-500': '249 115 22', // #f97316
        '--color-primary-600': '224 104 20', // #e06814
        '--color-primary-700': '187 86 17', // #bb5611
        '--color-primary-800': '149 69 13', // #95450d
        '--color-primary-900': '122 56 11', // #7a380b
        // secondary | #0ea5e9
        '--color-secondary-50': '219 242 252', // #dbf2fc
        '--color-secondary-100': '207 237 251', // #cfedfb
        '--color-secondary-200': '195 233 250', // #c3e9fa
        '--color-secondary-300': '159 219 246', // #9fdbf6
        '--color-secondary-400': '86 192 240', // #56c0f0
        '--color-secondary-500': '14 165 233', // #0ea5e9
        '--color-secondary-600': '13 149 210', // #0d95d2
        '--color-secondary-700': '11 124 175', // #0b7caf
        '--color-secondary-800': '8 99 140', // #08638c
        '--color-secondary-900': '7 81 114', // #075172
        // tertiary | #a855f7
        '--color-tertiary-50': '242 230 254', // #f2e6fe
        '--color-tertiary-100': '238 221 253', // #eeddfd
        '--color-tertiary-200': '233 213 253', // #e9d5fd
        '--color-tertiary-300': '220 187 252', // #dcbbfc
        '--color-tertiary-400': '194 136 249', // #c288f9
        '--color-tertiary-500': '168 85 247', // #a855f7
        '--color-tertiary-600': '151 77 222', // #974dde
        '--color-tertiary-700': '126 64 185', // #7e40b9
        '--color-tertiary-800': '101 51 148', // #653394
        '--color-tertiary-900': '82 42 121', // #522a79
        // success | #84cc16
        '--color-success-50': '237 247 220', // #edf7dc
        '--color-success-100': '230 245 208', // #e6f5d0
        '--color-success-200': '224 242 197', // #e0f2c5
        '--color-success-300': '206 235 162', // #ceeba2
        '--color-success-400': '169 219 92', // #a9db5c
        '--color-success-500': '132 204 22', // #84cc16
        '--color-success-600': '119 184 20', // #77b814
        '--color-success-700': '99 153 17', // #639911
        '--color-success-800': '79 122 13', // #4f7a0d
        '--color-success-900': '65 100 11', // #41640b
        // warning | #EAB308
        '--color-warning-50': '252 244 218', // #fcf4da
        '--color-warning-100': '251 240 206', // #fbf0ce
        '--color-warning-200': '250 236 193', // #faecc1
        '--color-warning-300': '247 225 156', // #f7e19c
        '--color-warning-400': '240 202 82', // #f0ca52
        '--color-warning-500': '234 179 8', // #EAB308
        '--color-warning-600': '211 161 7', // #d3a107
        '--color-warning-700': '176 134 6', // #b08606
        '--color-warning-800': '140 107 5', // #8c6b05
        '--color-warning-900': '115 88 4', // #735804
        // error | #ef4444
        '--color-error-50': '253 227 227', // #fde3e3
        '--color-error-100': '252 218 218', // #fcdada
        '--color-error-200': '251 208 208', // #fbd0d0
        '--color-error-300': '249 180 180', // #f9b4b4
        '--color-error-400': '244 124 124', // #f47c7c
        '--color-error-500': '239 68 68', // #ef4444
        '--color-error-600': '215 61 61', // #d73d3d
        '--color-error-700': '179 51 51', // #b33333
        '--color-error-800': '143 41 41', // #8f2929
        '--color-error-900': '117 33 33', // #752121
        // surface | #737373
        '--color-surface-50': '234 234 234', // #eaeaea
        '--color-surface-100': '227 227 227', // #e3e3e3
        '--color-surface-200': '220 220 220', // #dcdcdc
        '--color-surface-300': '199 199 199', // #c7c7c7
        '--color-surface-400': '157 157 157', // #9d9d9d
        '--color-surface-500': '115 115 115', // #737373
        '--color-surface-600': '104 104 104', // #686868
        '--color-surface-700': '86 86 86', // #565656
        '--color-surface-800': '69 69 69', // #454545
        '--color-surface-900': '56 56 56', // #383838
    },
};
