/* eslint-disable */
/* @formatter:off */

import MipmapElement from '../../../phet-core/js/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 186, 159, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAACfCAYAAABOb8N0AAAAAklEQVR4AewaftIAACMHSURBVO3Bf2hbB4Lg8a/OSrBGUOnWrFOo8ah/qH9U47HDdN8KRmX0SpndyzNMcjZOq64Zy7Azp5xF7OGgkri1484gK8PuWEWeivYgcnHra4yzScAKN0yv8rAKeDQTIq9WZan+6FuhgY6Cc3qBt68hgTv7YpNXjdP8shXLeZ8PBoPBYNgnTBgM9+cAvEA30AM4ADuQB94HZtnjTBgM2+sBfgh4gR6+3jLgB2T2KBMGw10OYAj4IeDg4dQAP3CBPciEwQBDwA8BL/fgcbp4+YVv4XG6sFmsbJi6dJb0ao46cWCMPcaE4WnlAE4CQ4CdbUjdAr3fFpC6BWwWK9tJr+YIzM2gaCo6eeAYILNHmDA8bbzASeAo2+jqcHBC7EXqFrBZrDyI8loV33unKVRkdGrAMWCZPcCE4WkxBEwADurYLFZ8bpETokRnWzuPKrSYIplZos4kcIonzIRhP7MDo8BJwE6drg4HJ8RepG4Bm8XKTkiv5gjMzaBoKjoXAD9Q4wkxYdiPHMAEcBSwU8fnFnnDLeJxutgNhYpMYC5BoSKjkwf8QJ4nwIRhP3EAE8AQdWwWKz63yAlRorOtnd2maCqBuRnSqzl0asAxYJkGM2HYD7zASeAodTrb2nnDLRIQJWwWK40Wu7TAVPosdcaAOA1kwtDMvMAE4KVOZ1s74SMD+NwiT1p6NUdgbgZFU9GZBfw0iAlDM/ICE4CXOh6nizfcIj63yF5SqMgE5hIUKjI6eUAEauwyE4Zm4gUmAC91PE4XYek4HqeLvUrRVHzvniZbKqIjA8eAPLvIhKEZeIEJwEsdj9NFWDqOx+miWQTmZphfyaBTA44By+wSE4a9zAtMAF7qeJwuwtJxPE4XzWh+JUNgboY6fmCWXWDCsBd5gQnASx2fW+SE2EtXh4Nmly0V8b17GkVT0YkDY+wwE4a9xAtMAF7q+Nwi4SMDdLa1s58UKjK+905TXquiMwv42UEmDHtBDzANeKkjdQvE+vx0trWzXymaihQfp1CR0ckDIlBjB5gwPEkOYAIYoo7H6SIsHcfjdPE0UDSVwNwM6dUcOnlABGo8JhOGJ8EBTABD1PE4XYSl43icLp5GgbkZ5lcy6NQAEcjzGEwYGskOTAND1PE4XYSl43icLp52ycwSocUUOjVABPI8IhOGRrADo8BJwI6Ox+kiLB3H43RhuGt+JUNgbgadGuAHLvAITBh2kx0YBU4CdnQ629qJ9fmRugUM20uv5gjMzaBoKjp+YJaHZMKwW4aACcCBTmdbO+EjA/jcIob7K1RkpPg4iqai4wdmeQgmDDttCJgAHOjYLFZi/X58bhHDwylUZKT4OIqmouMHZnlAJgw7xQtMAF50bBYrJ17pJSBK2CxWDI+mUJHxvXea8loVHT8wywMwYXhcPcA04KVOWDpOQJSwWawYHp+iqUjxcQoVGR0/MMt9mDA8KgcwAQxRx+cWCR8ZoLOtHcPOUjQVKT5OoSKj4wdm+RomDA/LDowCE9TxOF0kB0fobGvHsHsUTUWKj1OoyOj4gVnuwYThYZwCTgJ2dDxOF2HpOB6nC0NjKJqKFB+nUJHR8QOzbMOE4UEMAROAA53OtnZifX6kbgFD4ymaihQfp1CR2VQDRCBPHROGr+MFpoEedGwWK7F+Pz63iOHJKlRkpPg4iqayqQaIQB4dE4btOIAU4EXHZrFy4pVeAqKEzWLFsDcUKjJSfBxFU9mUB0SgxqYWDHp2IAnMAg50fG6R1PAYUrdA64GDGPaOQ8/YeeHQc5y7cplNzwLPAhfZ1IJhgx0IAf8TcKPjcbpIj77FG24R2zesGPamF559DpPJRLZUZFMPsAr8K+vMGIaACcCBTleHg1j/MB6nC0NzCB0Z4J8++xeypSKbpoELrDPx9PIC00APOp1t7YSPDOBzixiaT3mtStd4AJ3DQN7M08cBTANH0bFZrJx4pZeAKGGzWDE0B0VTCS2m2JAcHKGzrR2fW2R+JcOmo0DezNPDDkwAo9TxuUVi/X5sFiuG5pHMLDGVXkDRVDa84RbxOF3YLFbqmXk6jAITgB0dj9NFrH+Yrg4HhuaRLRUJLZ6hUJHR+3Alg8fpIlv6F3TyrDOzv3mBFOBAp7OtneTgCB6nC0PzUDSV0GKK+ZUMejaLlVi/H59bpLxWpVCR0VlmnZn9yQGkAC86NouVsDRAQOzF0FxilxZ455MlFE1FLyD2EpYGsFmsbJi6tIDOMlBjnZn9xQ5MAKPUCYi9hKUBbBYrhuaRLRUJzM1QXqui53G6iPUP09XhYIuiqaRXc+i8zyYz+8coMAHY0ZG6BWJ9fjrb2jE0j/JaldC5FOnVHHo2i5VYvx+fW6ReMpNG0VQ2ycAsm8w0Py+QAhzodHU4iPUP43G6MDSX2KUF3vlkCUVT0QtLxwmIEjaLlXrltSpT6bPoTKJjpnk5gGngKDo2i5WwNEBA7MXQXNKrOULnUpTXquh5nC6SgyN0trVzL1OXFtCRgVl0zDQfOzAKTFAnIPYSlgawWawYmkd5rUpgboZsqYheZ1s7sT4/UrfA18mWisyvZNCZpI6Z5jIETAN2dDxOF8nBETrb2jE0D0VTSWbSTKXPUi8sHScgStgsVu4ntHgGnWVgljpmmkMPMA140elsayc5OILH6cLQXNKrOULnUpTXquhJ3QKxPj+dbe08iGRmiUJFRmeMbZjZ2+zANDCEjs1i5cQrvYSODGBoLoWKTGjxDNlSEb3OtnaSgyN4nC4eVHmtylR6AZ04kGcbZvauUWACsKPjc4vE+v3YLFYMzUPRVKbSCyQzS+jZLFZOvNJL6MgADyswN4OiqWySgUnuwcze4wWmgR50ujocxPqH8ThdGJrL/EqG0GIKRVPRk7oFYn1+OtvaeVjJzBLZUhEdP1DjHszsHXZgGhhCx2axEuv343OLGJpLtlRkKn2WbKmIXleHg1j/MB6ni0dRqMiEFlPoxIFlvoaZvWEUmADs6ATEXsLSADaLFUPzUDSV0GKK+ZUMejaLlbA0QEDs5XEE5hLoyMAk92HmyfIC00APOh6ni1j/MF0dDgzNJZlZYiq9gKKp6PncIrF+PzaLlccRWkxRqMjo+IEa92HmybAD08AQOjaLlVi/H59bxNBcsqUiocUzFCoyel0dDmL9w3icLh5XejVHMrOEziSwzAMw03ijwARgRycg9hKWBrBZrBiaR3mtytSlBeZXMujZLFZi/X58bpGdUF6rEpibQScPnOIBmWmcHmAa8KLjcbqI9Q/T1eHA0FxilxZ455MlFE1FLyD2EpYGsFms7BTfe6dRNJVNNeAYD8HM7rMDo8AEOjaLlVi/H59bxNBcsqUigbkZymtV9DxOF7H+Ybo6HOykwNwMhYqMjh+QeQhmdpcXSAEOdHxukVi/H5vFiqF5lNeqhM6lSK/m0Otsayd8ZACfW2Snza9kmF/JoBMHLvCQzOwOOzABjKLT2dZOcnAEj9OFoXkomkoyk+adT5ZQNBW9sHScgChhs1jZaYWKTGBuBp08MMYjMLPzvEAKcKATlo4TOjKAobmkV3OEzqUor1XR8zhdJAdH6GxrZzeU16pI8XF0aoDIIzKzs6aBUXQ8Thex/mG6OhwYmkd5rUpgboZsqYheZ1s7sT4/UrfAblE0Fd97p1E0lU01QARqPCIzO8MOnAe8bLJZrISlAQJiL4bmoWgqyUyaqfRZ9GwWKyde6SUgStgsVnaLoqlI8XEKFRmdMSDPYzCzM84DXjZ1dThIDgbp6nBgaB7zKxmmLi1QXquiJ3ULxPr8dLa1s5sKFZnAXIJCRUZnDJjlMZl5fCnAyyafWyQ5OEKhImNoDoWKTGjxDNlSEb3OtnaSgyN4nC522/xKhtBiCkVT0ZkF4uwAM49nFBhik88tkhwcITA3w/xKhuTgCD63iGFvUjSVqfQCycwSejaLlROv9BI6MsBuUzSV0GKK+ZUMdcaAODvEzKPrAabZ5HG6SA6OELu0wPxKhg2BuRk2+Nwihr1lfiVDaDGFoqno+dwi4SMDdLa1s9uypSKBuRnKa1V0asAxYJkdZObR2IHzbOpsa2f+x2+yISBKLK3+lkJFZkNgboYNPreI4cnLlopMpc+SLRXR6+pwEOsfxuN00QihxRTJzBJ1loFjQI0dZuLRnAeOsikb/ge6OhxsUTQVKT5OoSKzJTk4gs8tYngyFE0ltJhifiWDns1iJSwNEBB7aYRCRSYwl6BQkakzBsTZJSYe3igwzaZYv5+A2Es9RVOR4uMUKjJbkoMj+NwihsZKZpaYSi+gaCp6PrdIrN+PzWKlEWKXFphKn6VOHvADeXaRiYfjAK4CdtZJ3QLzP3qTe1E0FSk+TqEisyU5OILPLWLYfdlSkdDiGQoVGT2P00VYOo7H6aIRChWZwFyCQkWmziRwigYw8XAygJd1NouVwk+T2CxWvo6iqUjxcQoVmS3JwRF8bhHD7iivVQmdS5FezaFns1iJ9fvxuUUaJXZpgan0WerkAT+Qp0FMPLhRYJpN8z96E6lb4EEomooUH6dQkdmSHBzB5xYx7KzYpQXe+WQJRVPRC4i9hKUBbBYrjZAtFQnMzVBeq1JnEjhFg5l4MA7gKmBnXUDsJdbv52EomooUH6dQkdmSHBzB5xYxPL5sqUhgbobyWhU9j9NFrH+Yrg4HjaBoKlPpBZKZJerkAT+Q5wkw8WAygJd1nW3tZMN/j81i5WEpmooUH6dQkdmSHBzB5xYxPJryWpXQuRTp1Rx6nW3thI8M4HOLNEq2VCQwN0N5rUqdSeAUT5CJ+zsKnGfT/I/eROoWeFSKpiLFxylUZLYkB0fwuUUMD07RVJKZNFPps9QLS8cJiBI2i5VGUDSV0GKK+ZUMdfKAH8jzhJn4enbgc8DOOqlbYP5Hb/K4FE1Fio9TqMhsSQ6O4HOLGO4vvZojdC5Fea2KnsfpIjk4QmdbO42SXs0RmJtB0VTqTAKn2CNMfL1TwATrbBYr2fDf09nWzk5QNBUpPk6hIrMlOTiCzy1i2F55rUpgboZsqYheZ1s7sT4/UrdAo5TXqoTOpUiv5qizDPgBmT3ExL05gM/ZFOv3ExB72UmKpiLFxylUZLYkB0fwuUUMdymaSjKTZip9Fj2bxcqJV3oJHRmgkZKZJabSCyiaik4NmATi7EEm7i0DeFnX1eEgG/4HdoOiqUjxcQoVmS3JwRF8bhEDzK9kCC2mUDQVPalbINbnp7OtnUYpVGRCi2fIlorUuQCMATJ7lInteYEMm9Kjb+FxutgtiqYixccpVGS2JAdH8LlFnlaFikxo8QzZUhG9zrZ2koMjeJwuGil2aYGp9Fnq1AA/cIE9zsT2MoCXdR6ni/ToW+w2RVOR4uMUKjJbkoMj+NwiTxNFU5lKL5DMLKFns1g58UovoSMDNFK2VCQwN0N5rUqdODAJ1GgCJv7UEJBiU+GtJJ1t7TSCoqlI8XEKFZktycERfG6Rp8H8SobQYgpFU9HzuUVi/X5sFiuNomgqocUU8ysZ6siAH1imiZj4U58DDtb53CLJwREaSdFUpPg4hYrMluTgCD63yH6VLRUJLZ6hUJHR6+pwEOsfxuN00UjzKxlCiykUTaXOJHCKJmTmq44CDjaFjwzQaDaLlfToW0jxcQoVmQ2BuRk2+Nwi+4miqYQWU8yvZNCzWayEpQECYi+NVF6rEpibIVsqUmcZGAPyNCkzX3WSTT63SGdbO0+CzWIlPfoWUnycQkVmQ2Buhg0+t8h+kMwsMZVeQNFU9HxukVi/H5vFSiPFLi0wlT5LnRowCcRpcmbu6gG8bAofGeBJslmspEffQoqPU6jIbAjMzbDB5xZpVtlSkdDiGQoVGT2P00Wsf5iuDgeNlC0VCczNUF6rUucC4Adq7AMt3PUm4Gadx+nixCu9PGmtBw7S95KHjz+9SvVGjQ3pf85hMpnwOF00k/JalcAHM5y6+AHVGzW22CxW4q//mFj/MIeesdMoiqYy9tF7hBdTKJqKjgwcA04DX7JPmLjrc8DBuuTgCD63yF6haCpSfJxCRWaLzy2SHByhGcQuLfDOJ0somopeQOwlLA1gs1hppPmVDKHFFIqmUmcSiAM19hkzd/QADtbZLFZ8bpG9xGaxkh59Cyk+TqEis2F+JcOG5OAIe1W2VCQwN0N5rYqex+ki1j9MV4eDRipUZEKLZ8iWitRZBsaAPPuUmTt62OR5wcVeZLNYSY++hRQfp1CR2TC/kmFDcnCEvaS8ViUwN0O2VESvs62dWJ8fqVugkRRNJZlJM5U+S50aMAnE2efM3OFg07c7nmevslmspEffQoqPU6jIbJhfybAhOTjCk6ZoKslMmqn0WeqFpeMERAmbxUojZUtFAnMzlNeq1JkFxoAaT4EW7ugB/pp15evXOCH2sle1HjhI30sePv70KtUbNTYUKjLl69fo7RZ4UtKrOXzv/Zz0ag49j9NFevQtpG6B1gMHaZTyWpXABzOcuvgBiqaiIwPHgLeBL3lKtHDHF8Ao6xRN5dsdz/PCs8+xV7UeOEjfSx4+/vQq1Rs1NhQqMuXr1+jtFmik8loV33unmf71eRRNZUtnWzvJwRFOHf0bbN+w0kixSwsE5mYoVGR0asBp4Bgg85Rp4Y4a4AB6WPc7ucQJsZe9rPXAQfpe8vDxp1ep3qixoVCRKV+/Rm+3wG5TNJVTFz9kODVN+fo1ttgsVn7yV/+Z+R+9yQvPPkcjZUtFfO+d5tyVy9y8fQudZeA/ARd4SrVw1yowyjpFU7F/w8pfPP8Ce1nrgYP0veTh40+vUr1RY0OhIlO+fo3eboHdMr+Soe+XPyNbKqIndQvM/+hNpG6BRlI0lbGP3iO8mKJ6o4aODPiBMFDjKdbCXTXADrhZ97vPS/R957vYvmFlL2s9cJC+lzx8/OlVqjdqbChUZMrXr9HbLbCTChWZ4TO/IJlJc/P2LbZ0trUz/+M3Gfv+MWzfsNJIycwSvnd/zu/lz6gTB14H8hho4at+C7wG2G/evkWhIvOGW2Svaz1wkL6XPHz86VWqN2psKFRkytev0dst8LgUTeXUxQ85MTdD+fo1ttgsViaP/g1nhn9CZ1s7jVSoyPT98qfMryxz8/YtdJaBY8D7wJcY/r8WvupLYBUYYl35+jXs37DyF8+/wF7XeuAgfS95+PjTq1Rv1NhQqMiUr1+jt1vgUSUzS/je/TnZUhE9n1vkH0f+Ox7nt2gkRVM5dfFDTszNUL1RQ6cGBIAx4AsMX9HCn5IBO+Bm3e8+L/Hqi4c59Iydva71wEH6XvLw8adXqd6osaFQkSlfv0Zvt8DDyJaK+N47zfzKMjdv32JLV4eD1PBPOCH20nrgII00v5Kh75c/I1sqUicOHANWMGyrhe39FngNsN+8fYvfyZ8x/PJf0QxaDxyk7yUPH396leqNGhsKFZny9Wv0dgvcj6KpjH30HuHFFNUbNbbYLFYmj/4NycEgnW3tNFKhIjN85hckM2lu3r6FTh54HXgX+BLDPbWwvS+BVWCIddUbNRTt33n1xcM0g9YDB+l7ycPHn16leqPGhkJFpnz9Gr3dAveSzCzhe/fn/F7+DL2A2Mv8j9/E4/wWjaRoKqcufsiJuRnK16+hUwPCgB+QMdxXC/cmA3bAzbrfy5/x7Y7neeHZ52gGrQcO0veSh48/vUr1Ro0NhYpM+fo1ersF9LKlItLbE5y7cpmbt2+xxeN0Mf/jEG+4RVoPHKSR5lcy9P3yZ2RLRerMAv8JWMbwwEzc31Wgh3U2i5XCT5PYLFaahaKpSPFxChWZLT63SHJwhPJaldC5FOnVHHo2i5VYvx+fW6TRChWZ0OIZsqUidfLAGLCM4aGZuD8HcBWws66rw0E2/A80E0VTkeLjFCoyG3xukW+2tfPOJ0somopeQOwlLA1gs1hpJEVTmUovkMwsUacGTAJxDI/MxIMZAlJsCoi9xPr9NBNFU5Hi43R1PM+3OxyEFlPoeZwukoMjdLa102jzKxlCiykUTaXOLDAG1DA8FhMPbhoYZdP8j95E6hZoJoqmYrNY2dA1HqC8VqWzrZ1Ynx+pW6DRsqUiocUzFCoydfLAGLCMYUe08OB+BRwFnmXdx5/mefXFwxx6xk6zqN6ogQlaDxzk2x3P8822dpKDI3R1PE8jKZrK2EfvEV5MUb1RQ6cGhAE/IGPYMSYejgO4CthZ19XhID36FjaLlb1O0VQ8U/+NDcnBETxOF09CMrPEVHoBRVOpMwuMATUMO66Fh1MDfgsMsa56o8Znf/wDfd/xsNeduvgh//vTqyiayvxKhhOv9NJ64CCNki0Vkd6e4NyVy9y8fQudZeAY8C7wJYZd0cLDkwEF+GvWlf74BxTt33n1xcPsVdlSkbGP3mVLWDrOqy8ephHKa1UCH8xw6uIHKJqKTg0IAGPAFxh2lZlHEwe6gSHWJTNLfLvDgc8tstcomkpgboYtXR0OQkcG2G2KppLMpHnnkyUUTaVOHJgEahgawsyjGwN6gB7WhRZTdHU8T1eHg71kKr1Aea3KluRgkN02v5Jh6tIC5bUqdZYBPyBjaKgWHt2XwFngvwCtN2/f4tyVy/R957vYvmFlL8iWiox99C5bwtJx+r7zXXZLoSIzfOYXJDNpFE1FRwb8QBioYWi4Fh7Pl8CvgNeA1pu3b5EtFel7yUPrgYM8SYqm0vfLn6FoKhu6OhycGf4Ju0HRVMY+eo+xj96lfP0aOjXgNHAM+FcMT0wLj+8L4I/AUdZVb9T43eef8YZb5EmK//oC6dUcW/7xv/4dh56xs9NilxYYPjPN7+XPqDMLvA5cwPDEtbAz8oAJ8LKufP0a5evX6O0WeBIKFZnhM79gS1g6Tt93vstOSq/m6HvnZ6RXc9y8fQudPPA68DZQw7AnmNk5p4BvAkOsm1/J8M22dkJHBmi0wFyCLV0dDkJHBtgphYpMaPEM2VKROjVgDJjFsOeY2Vl+wAF4WTeVPkvnn/05PrdIo8QuLVCoyGxJDgbZCYqmElpMMb+SYRuTQByoYdiTzOy8Y0AG6GFdYG6GDT63yG4rVGSm0mfZEpaO09Xh4HHFLi3wzidLKJpKnQvAGCBj2NPM7LwaIAJXAQfrAnMzdLa143G62E2BuQRbujochI4M8DjmVzJMXVqgvFalTh4YA5YxNIUWdseXwG+A14BW1qVXc7z64mEOPWNnN8QuLXDuymW2pIZ/QmdbO48iWyoSmJshmUmjaCo6NSAABAAZQ9NoYfd8AfwKeA1ovXn7FueuXObVFw9z6Bk7O6lQkRk+8wu2BMRehl/+Pg+rvFYl8MEMpy5+QPn6NXRqwGngdWAFQ9NpYXd9AfwKeA1ovXn7FueuXObVFw9z6Bk7O6Xvlz+leqPGhs62dlLDY7QeOMiDUjSVUxc/ZDg1TemPf6DOLPA6cAH4EkNTamH3fQH8CngNaL15+xbnrlzm1RcPc+gZO48rdmmBc1cus2X+x2/ywqHneBCKphL/9QWGz0yTLRWpswz4gbeBGoam1kJjfAH8Fhhi3c3btzh35TKvvniYQ8/YeVSFiszwmV+wJSD2Mvzy93kQ8ysZhlPTpFdz3Lx9Cx0Z8ANhQMawL7TQODLwb4AXaL15+xbnrlzm1RcPc+gZO4+i75c/pXqjxobOtnZSw2O0HjjI10mv5uh752fMr2RQNBWdGhAA/MC/YthXWmisPPAr4DWg9ebtW5y7cpkXDj3HC88+x8OIXVrg3JXLbJn/8Zu8cOg57iVbKhKYm2H61+dRNBWdGnAaeB1YwbAvtdB4XwC/Al4DWm/evsW5K5f5Zls7XR3P8yDKa1UCczPcvH2LDQGxl+GXv892sqUigbkZYpcWKF+/Rp04cAz4X8CXGPYtMw2UC0Z6ADsgC4moCGQAO+sCczOUr18jdGSA+wnMzaBoKhs629oJSwPUy5aKTKXPki0V2cYsMAnIGJ4KZhorA9gBGXgeEIEMYGfdVPos/1z5nOTgCDaLle0kM0tkS0W2JAdHsFmsbMmWikylz5ItFdnGLDAJyBieKi000N/+5csx7rD/7V++/Jv/kfunFeBd4K+BZ1lX+uMfOHflMi87v8WhZ+zoldeqDJ+Z5ubtW2wIiL0Mv/x9NmRLRQJzM8QuLVC+fo06y4AfeBuoYXjqmNgluWDEARwFfgC8LSSiF3LBiBeQgatADcgLiegxwA6kgKPohKXjBEQJm8XKBik+TrZUZENnWzvZ8N+TXs0xdWmB8lqVbSwDk8AyhqeamR2WC0Z6gGnAyx0yd9UABzALDHFXDTgGnAIm2DSVPsuHKxnCRwawWaxkS0W2dP7Zn9P1dwEUTWUby8AksIzBsM7EDssFI/8XqAGzwPtCIppnXS4YOQ8c5a5lIREVc8FID2AH8kIiWgO8QApwoGOzWFE0lfuYBd4HlnkAuWDkPPC+kIhewLCvmdhBuWBkCEgBY0AekAE7YAd6gB8CNe7wAyeBUe6oAaKQiOYBOzAKTHB/NWAWeBuQuY9cMOIFTgJ+IAW8LSSiyxj2NTM7y8Ed09ybDDiERFTOBSMXgX8DZCAFTADHgBpwCpgFTgJHAQdfdQG4CMxSJxeMTANDQB54H7gATABeoAeoAXYhET2G4algZmfJ3BEHLgI/AI4CMuAF4kIiOsYmIRFdBpZZlwtGfgAc5atkYAwYA3oAO3cs8/V6ADvQA+SBCcABzALvA7NCIlpDJxeMnAfeFxLRCxj2HTM7axmYFBLRU7lgpAc4CjgAB5AHJnPBSA/wQ6AH+A131ICLwNvcWz4XjPQADmAauCgkostsLw/I3DEK1AC/kIjOUicXjHiBk8BR4CKGfcnELsgFI15ABqaBSSERzbMuF4zYgSFgmnvLA3ngIrAsJKI11uWCkfPAUe4aExLROOtywYgdcAiJaB6dXDBynjv8QiJaywUjDmAIsAE9gJe7ZoVE1I9hXzKzw3LBiBfIAKKQiB7jq0aBk8BhwAt8DzjKnxoChoBJ4BR3vA/8BsgLiegyXzUKTOSCkbiQiI6xSUhEj/FVXmCCu2RgEsgLiWgew75l5iHlgpFRoBtwAG8LiegFvioPiEIiusyfygN2wC4konEgzrpcMHIU+AHgBY4JiaicC0a8QJ5NQiJ6gXuLA93AaC4YsQuJqJ9tCInoLDCL4alj5uFNcEee7fUAP8wFIxNAHpgUEtEadywDfiCPjpCIXgAuoCMkostsIxeMeAEv8D3ACxwWEtE8cCwXjKSAoVwwsiokonG+Ri4YOQ/8RkhE4xj2PRM7KBeMOIDPuSMP9ABjQiIa5x5ywYgdGAKWhUQ0T51cMNIDnAR6gB7ukoFlYExIRGtsygUjV4Ee4LCQiOa5h1wwMgTIQiK6jGHfM3MPuWDEDkwAipCInuLBHOUOWUhED+eCEbuQiNbYRi4YsQOjwEnADowBef6UAxgCloE4sAosC4mozPaOAVcBB5DnHoREdBbDU8PMvY0Co0CcBzfLHbOsExLRGtvIBSNHgRRgB2TgmJCILrMNIRG9AJh4QEIiKgP/EYNBx8y9fY87enhAQiJaA+J8jVww0gOc5y5ZSESXWZcLRnqADCADopCI1nhEuWDEC3iB7wFvC4noBQxPLTP35ge8QI0dJCSi+VwwMgbYgTyQZ10uGPEC5wE70AP0AMvcQy4Y8QI/ACaFRLTGplwwMgRMA3buyGN46pm5ByERlYFZ7iMXjHiBCcAvJKIyD0BIROP8KQdg544akGcbuWAkA3i5622gxl3dgJ078oBfSETzGJ5q/4FHlAtGHLlg5DyQAXp4TEIiOgtMAjXALySiNerkgpEhoIc78oAoJKIyOkIiOgb4gWWgBtQwPPVM3EcuGBkCZCERXUYnF4z8H8AOzAJjQiJaYxflgpEhIAXIgAM4JiSiFzAYHoCZ+/sB8Btgma/yA3khEZW5h1wwch6YFBLRPI/ve0AeEIVEtIbB8BBM7JJcMOIFMoBfSERnMRieIDO7Jw+IQiK6jMFgMBh23/8DGPi/VKYnGKgAAAAASUVORK5CYII=' ),
  new MipmapElement( 93, 80, 'data:image/png;base64,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' ),
  new MipmapElement( 47, 40, 'data:image/png;base64,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' ),
  new MipmapElement( 24, 20, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAAklEQVR4AewaftIAAAN5SURBVKXBe0zUBQDA8e/vfr87DiTDICmuOphw4D1UQGSeB0SJTpvLG5lbNWVJrclGZi3M4XrHWq5yAXPrj2jMMhfrgYXlBgQkxENCVN7yOB5JIgnYcdzj17loOVM64fMRWRiLNc6cl7Np2+sqUYo9PzxQyg0k5mfrvk3bstOM8WtNmnC1n1KJJcpg1N2jiXn7+NGdQC+zBG7Plv2PbN+7eUWCWR+mVYkKBdezzzj4or6q4/nPD2cCNXgJ+Ma8J21rrjXOnGq6L0ItKhTcisvt5uvmWtuuTz7IAMoF5qZ9IjH1nR3mh7fEh0fdoZIkfOH2eDhaX9mzu7hAL3ELcdrId/dtfnznukh9aKDaH19NO2do6utClgkDlkr819P5T+5+cYMhTh965xJ8JcsyZ4f6mZq2Y9SE8/2Zhh+BQYl/GfakWd/bviZ5/fJ771cKgoCvRv64TNvIALEPLCMoIJAvG6v788tL9+Il8bfklzamf/bCBqsmUO2Pr/6ccdDY20lYUDAPLV+F0+2mrLXxUmbRoZeBC3hJeOWlZxzMWJemqe1pJznahFIUmYvH46FlsBeny4U5Uo8kigyNX5JLmmrqDnxVnANUM0sKCwp+7dHYtasD/NQk6QxUdbSSHG1CKYrcjO3y73SPDhOvjWSx/yIcTieVHWfG3vj2yOEWW28uN5Desu54TLMkRMBLJSlJ0hmobG8hJXoFKkniH1PTdpr6utCGhJIas5JrOn4bdB2rryo/+ENJDvArNyENjY+Nu9xuJFHkGpWkJCXaREV7C6kxKxEVCpr7uxEEBRadEVGhYPzqFCfPne555tND7wOFzEEAUkqyckvW62ODuc6My8mp7jYEBFZHRLHIT43T7aLhQudEYcV3x0pb6rIBO/9DBPrLWhtdG43xqUsXB4nMcns8jE5cwaIzoJIk2kdsrqKakz89V/zRs50XB/MBFz4Q8ZpxOWuHxsdCEiJ0CUEBgQq8TnW3kRChY3TiCt8015635r/5anXXuWxggNsgMqt7dPhEsEppCL3r7phJu11hdzpotfXZdhV9WHCkriIdaGIeBGb9kvXKAcBU09/j7JucNOJynH5q1ZqzIHQkFuQdZ56k+qz9D4IcKMMQcNGiXRaRBD/LCCqQh5GFahZA/Lihui8zwRKGIDiQhTIQPCCEgNwpIJ9ILMy7ygL8BejPSj/d1fpYAAAAAElFTkSuQmCC' ),
  new MipmapElement( 12, 10, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAAAklEQVR4AewaftIAAAFvSURBVGNkwA20lqaVV+pIy9s9fPPyst/kxlgGBob3jAyYQG5ZWnmLgZySr5SAsAAjIyPD33//GC48unveqbsilJEBCUyLzemxUdGKkRUWE2diZGRABh++fmHYcunkahYGIMh19k+KsXQsVRKV0GBjYWVABr/+/GZ4/uEdw99//35cffpoC0tTQEy+s6Zhp5qEDDsTIyMDDPz//5/h2Ye3DMyMTAwcrGyfDt26MmXa/i2LWLz1zHOUxCTYH7x+waAgKsHAxMjI8P7rZ4bPP74zCHLz/L/z8vmpvGXT6y49ub+LAQhYvvz88YGJkYlBQVSc4cHrFwzMTMwMgtw8DP/+/X++6tThmUUrZzUyIAHmNWeOXA82tvYU5Obl/fT9GwMXO8e3M/dvrXfqqYjcefXsRgY0wPLl5/cj9+5eXfzs3euwzz++Pd9/8WTn9BMHNjLgAMwnsyqtednY33P++3NFgIlxu4GE3I45Zw7/ZcABACsCj6j4af+AAAAAAElFTkSuQmCC' )
];

export default mipmaps;