import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';

interface Props {
    visible: boolean;
    onClose: () => void;
    onImagesPicked: (images: any[]) => void;
}

const ImagePickerModal: React.FC<Props> = ({ visible, onClose, onImagesPicked }) => {
    const font = useSelector((state: any) => state.theme.font);
    const gradient = useSelector((state: any) => state.theme.gradient);


    const pickFromGallery = async () => {
        try {
            const images = await ImagePicker.openPicker({
                multiple: true,
                cropping: true,
            });
            onImagesPicked(images);
            onClose();
        } catch (error) {
            console.log('Gallery Error:', error);
        }
    };

    const captureFromCamera = async () => {
        try {
            const image = await ImagePicker.openCamera({ cropping: true });
            onImagesPicked([image]); // camera returns single image
            onClose();
        } catch (error) {
            console.log('Camera Error:', error);
        }
    };

    return (
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={[styles.title,{fontFamily:font}]}>Upload Image</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity onPress={pickFromGallery} style={styles.option}>
                            <Icon name="image-multiple" size={65} color={gradient.colors[0]} />
                            <Text style={[styles.label,{fontFamily:font}]}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={captureFromCamera} style={styles.option}>
                            <Icon name="camera" size={65} color={gradient.colors[0]} />
                            <Text style={[styles.label,{fontFamily:font}]}>Camera</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                        <Text style={[styles.cancelText,{fontFamily:font,color:gradient.colors[0]}]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textDecorationLine:"underline"
    },
    optionsContainer: {
        flexDirection: 'row',
        gap: 30,
    },
    option: {
        alignItems: 'center',
    },
    label: {
        marginTop: 10,
        fontSize: 14,
    },
    cancelButton: {
        marginTop: 20,
    },
    cancelText: {
        color: 'red',
        fontWeight: '600',
    },
});
