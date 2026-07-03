Hugging Face Space demo (Gradio)

What this is
- A minimal Gradio app that calls the Hugging Face Inference API.

Setup on Hugging Face Spaces
1. Create a new Space (Gradio).
2. Upload this repository or copy the files into the Space.
3. In the Space settings, add a secret named `HF_TOKEN` with your Hugging Face access token.
4. Optionally choose a small public model like `gpt2` or `google/flan-t5-small` as the default.

Run locally

1. Create a virtualenv and install dependencies:

```bash
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install -r requirements.txt
```

2. Set `HF_TOKEN` in your environment (Windows PowerShell example):

```powershell
# Temporary (current PowerShell session only):
$env:HF_TOKEN = "hf_xxx"
python app.py

# Persist across sessions (won't take effect until you open a new shell):
setx HF_TOKEN "hf_xxx"
# then restart PowerShell and run:
python app.py
```

3. Alternative shells (macOS / Linux / WSL):

```bash
# Temporary for this terminal session:
export HF_TOKEN="hf_xxx"
python app.py

# Persist by adding to your shell profile (bash/zsh):
echo 'export HF_TOKEN="hf_xxx"' >> ~/.bashrc
source ~/.bashrc
python app.py
```

3. Open http://localhost:7860

Notes
- For heavier usage or larger models, consider self-hosting or using Hugging Face paid plans. The Inference API has rate limits on free accounts.
- If you want the Space to load a model directly (without API token), replace the inference call with a local `transformers` pipeline and include model weights in the repo (not recommended for large models).

Set `HF_TOKEN` in a Hugging Face Space (recommended for deployment)

1. Create an access token: go to your Hugging Face profile → Settings → Access Tokens → New token. Use `read` scope for inference.
2. Open your Space page → Settings → Secrets → Add a secret. Use:

	- Name: `HF_TOKEN`
	- Value: your access token (paste)

The Space runtime exposes the secret as an environment variable; `app.py` reads it with `os.environ.get("HF_TOKEN")`.
