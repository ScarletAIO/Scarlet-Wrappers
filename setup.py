import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()


setuptools.setup(
    name='scarletai',  
    version='0.1',
    author="Scarlet AI",
    author_email="kaz@scarletai.xyz",
    description="A python wrapper for Scarlet AI's API",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ScarletAIO/Scarlet-Wrappers/",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
    py_modules=['scarletai'],
    package_dir={'scarletai': 'src/main.py'},
    package_data={'scarletai': ['__pycache__/*.pyc']},
    include_package_data=True
)