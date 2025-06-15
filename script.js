 const voiceSelect = document.getElementById('voice-select');
        const textarea = document.getElementById('text');
        const speakBtnTop = document.getElementById('speakBtnTop');
        const stopSpeech = document.getElementById('stopSpeech');
        
        let voices = [];

        /**
         * Populates the voice selection dropdown with available voices.
         */
        function populateVoiceList() {
            // Get available voices
            voices = speechSynthesis.getVoices();
            // Clear existing options
            voiceSelect.innerHTML = '';
            // Add a default "Select Voice" option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select a voice';
            voiceSelect.appendChild(defaultOption);

            // Add each available voice as an option
            voices.forEach((voice, idx) => {
                const option = document.createElement('option');
                option.value = idx; // Use index as value
                option.textContent = `${voice.name} (${voice.lang})`;
                // Select a default English voice if available
                if (voice.lang.startsWith('en-') && voice.default) {
                    option.selected = true;
                }
                voiceSelect.appendChild(option);
            });

            // If no voice is selected by default, select the first one
            if (voiceSelect.value === '' && voices.length > 0) {
                voiceSelect.value = 0;
            }
        }

        /**
         * Speaks the text from the textarea using the selected voice.
         */
        function speak() {
            const textToSpeak = textarea.value.trim(); // Get text and trim whitespace

            if (!textToSpeak) {
                // Optionally show a message to the user if no text is entered
                // In a real app, you might display a Bootstrap alert here.
                console.warn('Please enter some text to pronounce.');
                return;
            }

            // Create a new SpeechSynthesisUtterance object
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            
            // Get the selected voice index from the dropdown
            const selectedVoiceIndex = voiceSelect.value;

            // Set the voice if a valid one is selected
            if (selectedVoiceIndex !== '' && voices[selectedVoiceIndex]) {
                utterance.voice = voices[selectedVoiceIndex];
            } else {
                // Fallback to default voice if none selected or invalid index
                console.log('No specific voice selected or invalid index, using default.');
            }

            // Speak the utterance
            speechSynthesis.speak(utterance);
        }

        // Event listener for when voices are loaded/changed
        speechSynthesis.onvoiceschanged = populateVoiceList;

        // Populate voice list on initial load
        // This ensures voices are available even if onvoiceschanged doesn't fire immediately
        document.addEventListener('DOMContentLoaded', () => {
            populateVoiceList();
            // Attach event listeners to buttons
            speakBtnTop.addEventListener('click', speak);
            speakBtnBottom.addEventListener('click', speak);
        });
        //stopSpeech button functionality
        stopSpeech.addEventListener('click', () => {
            speechSynthesis.cancel(); // Stop any ongoing speech
        });
