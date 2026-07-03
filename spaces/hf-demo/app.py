import os
import requests
import gradio as gr


HF_TOKEN = os.environ.get("HF_TOKEN")


def call_hf_inference(model: str, prompt: str, max_tokens: int, temperature: float):
    if not HF_TOKEN:
        return "Error: HF_TOKEN not set. Add your Hugging Face token as a secret named HF_TOKEN."

    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    payload = {
        "inputs": prompt,
        "parameters": {"max_new_tokens": max_tokens, "temperature": temperature},
    }

    url = f"https://api-inference.huggingface.co/models/{model}"
    try:
        resp = requests.post(url, headers=headers, json=payload, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        # response can be a list with dicts or a dict depending on model
        if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
            return data[0].get("generated_text") or data[0].get("text") or str(data)
        if isinstance(data, dict) and "generated_text" in data:
            return data["generated_text"]
        return str(data)
    except Exception as e:
        return f"Inference error: {e}"


with gr.Blocks() as demo:
    gr.Markdown("# Hugging Face Inference demo (Gradio)\nEnter a model name and prompt, then press Submit. Set `HF_TOKEN` in Space secrets.")

    with gr.Row():
        model_input = gr.Textbox(value="gpt2", label="Model (owner/model)")
        max_tokens = gr.Slider(minimum=1, maximum=512, value=64, step=1, label="Max new tokens")

    with gr.Row():
        temp = gr.Slider(minimum=0.0, maximum=1.5, value=0.7, step=0.01, label="Temperature")

    prompt = gr.Textbox(lines=6, placeholder="Write a prompt...", label="Prompt")
    out = gr.Textbox(lines=8, label="Output")

    submit = gr.Button("Submit")
    submit.click(lambda m, p, t, tempv: call_hf_inference(m, p, t, tempv),
                 inputs=[model_input, prompt, max_tokens, temp], outputs=out)


if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
