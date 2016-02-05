package com.procergs.rsp.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.procergs.rsp.image.ed.ImageED;

public class RSPUtil {

	public static List<byte[]> getFiles(MultipartFormDataInput input, String parameterName) {
		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
		List<byte[]> files = new ArrayList<>();
		List<InputPart> inputParts = uploadForm.get(parameterName);
		if (inputParts != null) {
			for (InputPart inputPart : inputParts) {
				try {
					InputStream istream = inputPart.getBody(InputStream.class, null);
					files.add(IOUtils.toByteArray(istream));
				} catch (IOException e) {
					e.printStackTrace();
					continue;
				}
			}
		}
		return files;
	}

	
	public static List<ImageED> getImages(MultipartFormDataInput input, String parameterName) {
		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
		List<ImageED> files = new ArrayList<>();
		List<InputPart> inputParts = uploadForm.get(parameterName);
		if (inputParts != null) {
			for (InputPart inputPart : inputParts) {
				try {
					ImageED imageED = new ImageED();
					imageED.setDate(Calendar.getInstance());
					InputStream istream = inputPart.getBody(InputStream.class, null);
					imageED.setImage(IOUtils.toByteArray(istream));
					imageED.setType(inputPart.getMediaType().getSubtype());
					files.add(imageED);
				} catch (IOException e) {
					e.printStackTrace();
					continue;
				}
			}
		}
		return files;
	}

}
